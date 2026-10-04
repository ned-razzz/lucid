# Lucid

This repository contains Lucid, an Agent Skill for compatible coding agents. It makes AI responses easier to read, follow, and understand by prioritizing clear explanations and structure over reducing response length. Lucid supports Korean and English.

## Project principles

- Keep explanations clear, intuitive, and accurate.
- Adjust explanation depth to the user's intent and demonstrated understanding in the prompt and relevant context. Briefly explain concepts needed to follow the answer when familiarity is unclear.
- Preserve details needed to understand the answer; remove wording only when it adds no meaning.
- Keep skill instructions independent of agent-specific commands, paths, and persistent modes.
- Keep the standard Agent Skills structure and remove files or code the skill does not need.

## Skill Instructions

When revising a Skill, apply the requested change without turning the editing
conversation into additional instructions. Keep only guidance needed to execute
the workflow or make decisions; omit explanations and redundant prohibitions
or permissions that merely restate what was removed or changed.

Keep shared explanation and editing principles in `skills/lucid/SKILL.md`.
Keep language-specific expression rules and examples in the matching reference.

## Directory structure

```text
.
├── assets/
│   └── lucid-light.svg
├── skills/
│   └── lucid/
│       ├── references/
│       │   ├── en.md
│       │   └── ko.md
│       ├── LICENSE
│       └── SKILL.md
├── AGENTS.md
├── LICENSE
└── README.md
```
