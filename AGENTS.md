# Lucid

This repository contains Lucid, an Agent Skill for compatible coding agents. It makes Korean and English answers and reader-facing documentation easier to read and understand by reducing the effort readers need to follow explanations.

## Project principles

- Prioritize readability, intuitive explanations, and low reading difficulty while preserving accuracy.
- Adjust explanation depth to the task's purpose and intended readers' knowledge. For answers, use the user's demonstrated understanding in the prompt and relevant context. Briefly explain necessary concepts when familiarity is unclear.
- Preserve the context and details readers need; remove expressions only when they add no information, meaningful nuance, or connection between ideas.
- Keep skill instructions independent of agent-specific commands, paths, and persistent modes.
- Keep the standard Agent Skills structure and remove files or code the skill does not need.

## Skill Instructions

When revising a Skill, apply the requested change without turning the editing
conversation into additional instructions. Keep only guidance needed to execute
the workflow or make decisions; omit explanations and redundant prohibitions
or permissions that merely restate what was removed or changed.

Keep shared explanation and editing principles in `skills/lucid/SKILL.md`.
Keep English and Korean expression guidance in `skills/lucid/SKILL.md`.

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
