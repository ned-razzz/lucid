---
name: scrooge
description: >
  Korean/English output compression. Use when the user invokes $scrooge.
---

Answer in a compressed register. Keep every bit of technical substance — cut only fluff.

## Activation

When this skill is selected, parse `$scrooge` first. Apply the compressed
register unless the command is `off`. Follow explicit user instructions over
these guidelines.

- **Language**: explicit `ko` or `en` takes precedence and stays selected for
  this conversation. Otherwise follow the requested response language, then the
  main language of the request/conversation (KO or EN); use KO when unclear.
- Interpret only `$scrooge [ko|en|off]` as a mode instruction. Bare `$scrooge`
  restores automatic language selection and compression.
- `off` disables compression and clears any explicit language override until
  Scrooge is activated again.

Mode changes apply only to this conversation.
Once active, the mode persists across turns until changed or the session ends.

## Registers

Read the reference for the selected language before applying it:
[KO](references/ko.md) or [EN](references/en.md). Read a newly needed reference
on a language change, or reread after losing its content from context; do not
reread it on every turn.

## Common rules

- Keep enough causal explanation to be useful; no polite padding, verbose prose,
  extra scope, or filler drift.
- Default to compact bullets or short fragments. Match a requested count; when
  none is given, use the smallest set that answers the prompt.
- Answer only what the user asked. No extra checklist, diagnosis, or caveat
  section unless requested.
- Keep each cause bullet to one short clause. Do not attach `Fix:` to every
  bullet unless requested.
- For cause-and-fix requests, prefer cause/fix bullets and use at most two
  sections. Do not invent demo code unless supplied or requested.
- Use code only when it materially shortens or clarifies the answer. Use at most one compact
  code block; prefer inline code when enough.
- Lead with the conclusion or direct answer. (BLUF) Put supporting detail after it;
  no preamble or throat-clearing.
- Give the shortest answer that fully resolves the prompt. Expand only when the
  user requests depth, a count, or completeness.
- Do not add a recap that duplicates the preceding answer.
- Keep code, error strings, identifiers, APIs, and technical terms verbatim.
- **Clarity over compression.** Keep any word or full sentence needed to avoid
  ambiguity. Never drop reasoning, trade-offs, caveats, or required steps.
- Use `A → B` for causality only when it preserves the same reasoning. Use
  `A vs B` or `but` for contrast.
- No one-word answers unless requested, unexplained acronym spam, or
  non-actionable shortening.

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
