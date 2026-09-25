# Lucid

This repository contains Lucid, an Agent Skill for compatible coding agents. It makes AI responses easier to read, follow, and understand by prioritizing clear explanations and structure over reducing response length. Lucid supports Korean and English.

## Project principles

- Keep explanations clear, intuitive, and accurate.
- Preserve details needed to understand the answer; remove wording only when it adds no meaning.
- Keep skill instructions independent of agent-specific commands, paths, and persistent modes.
- Keep the standard Agent Skills structure and remove files or code the skill does not need.

## Directory structure

```text
.
├── assets/
│   └── logo.svg
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
