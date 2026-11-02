# Lucid

This repository contains Lucid, an Agent Skill for compatible coding agents. It makes Korean and English answers and reader-facing documentation easier to read and understand by reducing the effort readers need to follow explanations.

## Project principles

- Prioritize readability, intuitive explanations, and low reading difficulty while preserving accuracy.
- Keep every level easy to understand; vary how fully the reasoning and process are explained. Follow the level definitions and default in [the skill instructions](skills/lucid/SKILL.md#explanation-level).
- Preserve the context and details readers need; remove expressions only when they add no information, meaningful nuance, or connection between ideas.
- Keep explanations concise within the readability principles. Limit background and examples to what readers need for understanding.
- Keep skill instructions independent of agent-specific commands, paths, and persistent modes.
- Keep the standard Agent Skills structure and remove files or code the skill does not need.

## Skill Instructions

When revising a Skill, apply the requested change without turning the editing
conversation into additional instructions. Keep only guidance needed to execute
the workflow or make decisions; omit explanations and redundant prohibitions
or permissions that merely restate what was removed or changed.

Keep shared explanation and editing principles in `skills/lucid/SKILL.md`.
Keep English and Korean expression guidance in `skills/lucid/SKILL.md`.

## Evaluation

Keep each question focused on one technical judgment. Maintain the question-specific
Lucid levels in `evals/benchmark.py` and keep the other comparison conditions independent
of those levels. Save each question's answers in one Markdown file with a top-level
heading for each condition and the applied level in the Lucid heading.

Keep evaluation usage in [evals/README.md](evals/README.md) and question prompts in
[evals/questions/](evals/questions/). Verify runner changes with the
offline tests in `tests/test_benchmark.py`; model-backed comparisons are separate from
those tests.

## Directory structure

```text
.
├── assets/
│   └── lucid-light.svg
├── evals/
│   ├── questions/
│   ├── README.md
│   └── benchmark.py
├── scripts/
│   ├── install-lucid-skill.ps1
│   └── test-install-lucid-skill.ps1
├── skills/
│   └── lucid/
│       ├── references/
│       │   └── documentation.md
│       └── SKILL.md
├── tests/
│   └── test_benchmark.py
├── AGENTS.md
├── LICENSE
└── README.md
```
