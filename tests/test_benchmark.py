"""Offline checks; never call a model or retain question/answer fixtures."""

import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from evals import benchmark


class RunnerChecks(unittest.TestCase):
    def test_answer_requires_completed_turn_and_nonempty_final_message(self):
        message = {
            "type": "item.completed",
            "item": {"type": "agent_message", "text": "answer"},
        }
        complete = {"type": "turn.completed"}
        blank = {
            "type": "item.completed",
            "item": {"type": "agent_message", "text": " "},
        }
        tool = {"type": "item.completed", "item": {"type": "command_execution"}}
        for events in (
            [],
            [message],
            [complete],
            [message, blank, complete],
            [tool, message, complete],
        ):
            with self.subTest(events=events), self.assertRaises(RuntimeError):
                benchmark.parse_answer(
                    "\n".join(json.dumps(event) for event in events), "test"
                )
        stdout = "\n".join(json.dumps(event) for event in [message, complete])
        self.assertEqual(benchmark.parse_answer(stdout, "test"), "answer")

    def test_cli_failure_reports_variant_and_diagnostics(self):
        with patch.object(benchmark.subprocess, "run") as run:
            run.return_value.returncode = 1
            run.return_value.stderr = "CLI failed"
            with self.assertRaisesRegex(RuntimeError, "with_skill: CLI failed"):
                benchmark.run_cli("unused", "question", "with_skill")

    def test_default_runs_all_questions_in_order_and_skips_readme(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            questions = root / "questions"
            questions.mkdir()
            (questions / "02-second.md").write_text("second", encoding="utf-8")
            (questions / "01-first.md").write_text("first", encoding="utf-8-sig")
            (questions / "README.md").write_text("", encoding="utf-8")
            output = root / "results"
            with (
                patch.object(benchmark, "HERE", root),
                patch(
                    "sys.argv",
                    ["benchmark.py", "--cli", "unused", "--out", str(output)],
                ),
                patch.object(benchmark, "generate") as generate,
            ):
                benchmark.main()
                self.assertEqual(
                    [call.args for call in generate.call_args_list],
                    [
                        ("first", output / "01-first.md", "unused", False),
                        ("second", output / "02-second.md", "unused", False),
                    ],
                )
                self.assertEqual(
                    [call.kwargs for call in generate.call_args_list],
                    [{"level": None}, {"level": None}],
                )

    def test_explicit_question_keeps_single_output_directory(self):
        with tempfile.TemporaryDirectory() as directory:
            question = Path(directory) / "question.md"
            question.write_text("single", encoding="utf-8")
            output = Path(directory) / "result"
            with (
                patch(
                    "sys.argv",
                    [
                        "benchmark.py",
                        str(question),
                        "--cli",
                        "unused",
                        "--out",
                        str(output),
                        "--documentation",
                    ],
                ),
                patch.object(benchmark, "generate") as generate,
            ):
                benchmark.main()
                generate.assert_called_once_with(
                    "single", output / "question.md", "unused", True, level=None
                )

    def test_bundled_questions_apply_levels_only_to_skill_answers(self):
        for filename, level in (
            ("01-aws-login-session.md", "core"),
            ("02-ros2-qos.md", "flow"),
            ("03-ai-data-split.md", "steps"),
        ):
            with (
                self.subTest(question=filename),
                tempfile.TemporaryDirectory() as directory,
            ):
                question = benchmark.HERE / "questions" / filename
                with (
                    patch(
                        "sys.argv",
                        [
                            "benchmark.py",
                            str(question),
                            "--cli",
                            "unused",
                            "--out",
                            str(Path(directory) / "result"),
                        ],
                    ),
                    patch.object(benchmark, "generate") as generate,
                ):
                    benchmark.main()
                    self.assertEqual(generate.call_args.kwargs, {"level": level})
                variants = benchmark.instructions(level=level)
                directive = f"Apply Lucid's `{level}` explanation level to this answer."
                self.assertIn(directive, variants["with_skill"])
                self.assertEqual(variants["without_skill"], "")
                self.assertEqual(variants["short_prompt"], benchmark.SHORT_PROMPT)

    def test_empty_question_does_not_create_outputs_or_call_cli(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "result.md"
            with patch.object(benchmark.subprocess, "run") as call:
                with self.assertRaises(ValueError):
                    benchmark.generate("\n", output, "unused")
                call.assert_not_called()
            self.assertFalse(output.exists())

    def test_comparison_pins_luna_medium_and_does_not_overwrite_results(self):
        events = [
            {
                "type": "item.completed",
                "item": {"type": "agent_message", "text": "test-output"},
            },
            {
                "type": "turn.completed",
                "usage": {"input_tokens": 1, "output_tokens": 1},
            },
        ]
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "result.md"
            with patch.object(benchmark.subprocess, "run") as call:
                call.return_value.returncode = 0
                call.return_value.stdout = "\n".join(
                    json.dumps(event) for event in events
                )
                benchmark.generate("test-input", output, "unused")
                self.assertEqual(call.call_count, 3)

                for invocation in call.call_args_list:
                    command = invocation.args[0]
                    self.assertEqual(
                        command[command.index("--model") + 1], "gpt-6-luna"
                    )
                    self.assertIn('model_reasoning_effort="medium"', command)
                    self.assertIn("--ignore-user-config", command)
                self.assertEqual(list(Path(directory).iterdir()), [output])
                report = output.read_text(encoding="utf-8")
                self.assertEqual(report.count("test-output"), 3)
                self.assertLess(
                    report.index("# 기본 응답"), report.index("# Lucid (flow)")
                )
                self.assertLess(
                    report.index("# Lucid (flow)"), report.index("# 한 문장 프롬프트")
                )
                self.assertTrue(report.startswith("# 기본 응답\n"))
                self.assertNotIn("# 답변 비교", report)
                self.assertNotIn("## ", report)
                self.assertNotIn(b"\r", output.read_bytes())
                with self.assertRaises(FileExistsError):
                    benchmark.generate("test-input", output, "unused")
                self.assertEqual(call.call_count, 3)

    def test_failed_variant_keeps_completed_answers_in_report(self):
        events = [
            {
                "type": "item.completed",
                "item": {"type": "agent_message", "text": "first answer"},
            },
            {"type": "turn.completed"},
        ]
        stdout = "\n".join(json.dumps(event) for event in events)
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "result.md"
            with (
                patch.object(
                    benchmark, "run_cli", side_effect=[stdout, RuntimeError("failed")]
                ),
                self.assertRaisesRegex(RuntimeError, "failed"),
            ):
                benchmark.generate("question", output, "unused")
            report = output.read_text(encoding="utf-8")
            self.assertIn("# 기본 응답\n\nfirst answer", report)
            self.assertNotIn("# Lucid", report)


if __name__ == "__main__":
    unittest.main()
