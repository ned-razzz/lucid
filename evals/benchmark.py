"""Generate three answers per question for manual comparison."""
import argparse
from datetime import datetime, timezone
import json
from pathlib import Path
import re
import shutil
import subprocess
import tempfile

HERE = Path(__file__).resolve().parent
SKILL = HERE.parent / "skills" / "lucid"
MODEL = "gpt-6-luna"
REASONING_EFFORT = "medium"
SHORT_PROMPT = "한국어로 쉽고 자세하고 간결하게 설명해. 독자를 기본적인 개발 지식은 있지만 특정 기술이나 프로젝트의 내부 맥락까지 모두 알고 있지는 않은 주니어 개발자로 상정하고 답변해."


def instructions(documentation=False):
    text = (SKILL / "SKILL.md").read_text(encoding="utf-8")
    text = re.sub(r"\A---\n.*?\n---\n", "", text, count=1, flags=re.S).strip()
    if documentation:
        text += "\n\n" + (SKILL / "references" / "documentation.md").read_text(encoding="utf-8")
    return {"without_skill": "", "with_skill": text, "short_prompt": SHORT_PROMPT}


def generate(question, output, cli, documentation=False):
    if not question.strip():
        raise ValueError("질문 파일에 질문을 입력해 주세요.")
    variants = instructions(documentation)
    output.mkdir(parents=True, exist_ok=False)
    for name, guidance in variants.items():
        prompt = (f"Response guidance:\n{guidance}\n\n" if guidance else "") + "Task:\n" + question
        with tempfile.TemporaryDirectory(prefix="lucid-compare-") as directory:
            system = Path(directory) / "instructions.md"
            system.write_text("You are a helpful technical assistant. Complete the user's task using only the supplied information. Do not use tools.", encoding="utf-8")
            command = [cli, "exec", "--ignore-user-config", "--ignore-rules", "--ephemeral",
                       "--skip-git-repo-check", "--sandbox", "read-only", "--json", "--model", MODEL,
                       "-c", f'model_reasoning_effort="{REASONING_EFFORT}"',
                       "-c", f"model_instructions_file={json.dumps(system.as_posix())}",
                       "-c", "project_doc_max_bytes=0", "-c", 'web_search="disabled"',
                       "--disable", "shell_tool", "--disable", "apps", "--disable", "plugins",
                       "--disable", "multi_agent", "--disable", "hooks", "-"]
            result = subprocess.run(command, input=prompt, text=True, encoding="utf-8",
                                    capture_output=True, cwd=directory, timeout=240)
        if result.returncode:
            raise RuntimeError(f"{name}: {result.stderr or result.stdout}")
        events = [json.loads(line) for line in result.stdout.splitlines() if line.strip()]
        items = [event["item"] for event in events if event.get("type") == "item.completed"]
        if any(item.get("type") not in ("agent_message", "reasoning") for item in items):
            raise RuntimeError(f"{name}: 도구를 사용한 응답은 비교에서 제외합니다.")
        answers = [item["text"] for item in items if item.get("type") == "agent_message"]
        completed = next((event for event in reversed(events) if event.get("type") == "turn.completed"), None)
        if not completed or not answers or not answers[-1].strip():
            raise RuntimeError(f"{name}: 정상적으로 완료된 최종 답변이 없습니다.")
        (output / f"{name}.md").write_text(answers[-1], encoding="utf-8")
        print(f"Saved: {output / (name + '.md')}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("question", nargs="?", type=Path, help="Question file (default: all Markdown questions in evals/questions, excluding README.md)")
    parser.add_argument("--documentation", action="store_true", help="Include Lucid's documentation reference")
    parser.add_argument("--cli", default=shutil.which("codex.exe") or shutil.which("codex"))
    parser.add_argument("--out", type=Path, default=HERE / "results" / datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ"))
    args = parser.parse_args()
    try:
        paths = [args.question] if args.question else sorted(
            path for path in (HERE / "questions").glob("*.md")
            if path.is_file() and path.name.lower() != "readme.md"
        )
        if not paths:
            parser.error("evals/questions에 질문 Markdown 파일이 없습니다.")
        questions = [(path, path.read_text(encoding="utf-8-sig")) for path in paths]
        for path, question in questions:
            if not question.strip():
                parser.error(f"{path}: 질문 파일에 질문을 입력해 주세요.")
        if not args.cli:
            parser.error("로그인된 Codex CLI가 필요합니다. --cli로 경로를 지정할 수 있습니다.")
        output = args.out.resolve()
        if not args.question:
            output.mkdir(parents=True, exist_ok=False)
        for path, question in questions:
            print(f"Question: {path}")
            destination = output if args.question else output / path.stem
            generate(question, destination, args.cli, args.documentation)
    except (OSError, ValueError, RuntimeError, subprocess.TimeoutExpired) as error:
        parser.exit(1, f"{error}\n")


if __name__ == "__main__":
    main()
