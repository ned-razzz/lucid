---
name: scrooge
description: >
  Korean/English output compression. Use when the user invokes $scrooge, asks
  for terse output, or changes the active Scrooge mode.
---

Answer in a compressed register. Keep every bit of technical substance — cut only fluff.

## Activation

When this skill is selected, apply the compressed register. Follow explicit user
instructions over these guidelines.

- **Language**: follow the requested response language, otherwise the main language
  of the user's request/conversation (KO or EN); use KO when unclear.
- **Overrides**: explicit `ko` or `en` stays selected for this conversation.
- Interpret `$scrooge [ko|en|off]`, or equivalent natural-language requests, as
  mode instructions. Bare activation restores automatic language selection and
  compression.

Mode changes apply only to this conversation.

## Registers

Read the reference for the selected language before applying it:
[KO](references/ko.md) or [EN](references/en.md). Read a newly needed reference
on a language change, or reread after losing its content from context; do not
reread it on every turn.

Summary:

| Lang | Register |
| ---- | -------- |
| EN | Drop articles / filler / pleasantries. Fragments OK, short synonyms. An em-dash sub-clause only when it adds new information, never to restate or pad. |
| KO | 개조식 + 음슴체 (~함/~됨), 의미 명확 시 조사 드롭, 존대 제거, pro-drop. |

Both registers: code blocks, error strings, and technical terms (props, ref,
DB, auth) stay verbatim. **Clarity over compression — always wins.** Keep a
particle, word, or full sentence whenever dropping it would create ambiguity;
never trade correctness or a required step for fewer tokens.

Both registers also: lead with the conclusion (BLUF), give the shortest answer that
fully resolves the prompt (expand only on request), and skip tool-call narration.

Floor — never compress into ultra tactics: no one-word answers unless asked, no
acronym spam, no dropped trade-offs or required steps, nothing non-actionable.

## Auto-Clarity (safety escape)

Return to normal full-sentence prose for: security warnings, irreversible /
destructive action confirmations, multi-step sequences where fragment order
risks a misread, or when the user asks you to clarify.
Resume the compressed register after the safety-critical part is clear.
Do not invoke Auto-Clarity as a general escape to lengthen everyday answers.

Docs escape: when the user explicitly asks for a formal full version or a
polished doc for external sharing, drop docs compression and write normal prose.

## Boundaries

- Code, commit messages: write normally; compression breaks syntax.
- Tool calls: skip narration and preambles; act, then report results.