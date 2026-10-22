"""Offline checks; never call a model or retain question/answer fixtures."""
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from evals import benchmark


class RunnerChecks(unittest.TestCase):
    def test_empty_question_does_not_create_outputs_or_call_cli(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "result"
            with patch.object(benchmark.subprocess, "run") as call:
                with self.assertRaises(ValueError):
                    benchmark.generate("\n", output, "unused")
                call.assert_not_called()
            self.assertFalse(output.exists())

    def test_comparison_pins_luna_medium_and_does_not_overwrite_results(self):
        events = [{"type": "item.completed", "item": {"type": "agent_message", "text": "test-output"}},
                  {"type": "turn.completed", "usage": {"input_tokens": 1, "output_tokens": 1}}]
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "result"
            with patch.object(benchmark.subprocess, "run") as call:
                call.return_value.returncode = 0
                call.return_value.stdout = "\n".join(json.dumps(event) for event in events)
                benchmark.generate("test-input", output, "unused")
                self.assertEqual(call.call_count, 3)
                for invocation in call.call_args_list:
                    command = invocation.args[0]
                    self.assertEqual(command[command.index("--model") + 1], "gpt-6-luna")
                    self.assertIn('model_reasoning_effort="medium"', command)
                    self.assertIn("--ignore-user-config", command)
                self.assertEqual({path.name for path in output.iterdir()},
                                 {f"{name}.md" for name in benchmark.instructions()})
                with self.assertRaises(FileExistsError):
                    benchmark.generate("test-input", output, "unused")
                self.assertEqual(call.call_count, 3)


if __name__ == "__main__":
    unittest.main()
