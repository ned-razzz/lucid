# Lucid

This repository contains Lucid, an Agent Skill for compatible coding agents. It makes answers and reader-facing documentation easier to read, follow, and understand by prioritizing clear explanations and structure over reducing length. Lucid supports Korean and English.

## Project principles

- Keep explanations clear, intuitive, and accurate.
- Adjust explanation depth to the task's purpose and intended readers' knowledge. For answers, use the user's demonstrated understanding in the prompt and relevant context. Briefly explain necessary concepts when familiarity is unclear.
- Preserve details needed to understand the content; remove wording only when it adds no meaning.
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
├── skills/
│   └── lucid/
│       ├── references/
│       │   └── documentation.md
│       ├── LICENSE
│       └── SKILL.md
├── AGENTS.md
├── LICENSE
└── README.md
```
