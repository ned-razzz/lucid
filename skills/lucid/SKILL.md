---
name: lucid
description: >
  Improve clarity in Korean or English informational writing. Use when
  explaining, analyzing, or organizing factual or technical information for
  readers.
---

Answer in a compressed register. Keep every bit of technical substance — cut only fluff.

## Activation

When this skill is selected, apply its response rules to the current task.
Follow explicit user instructions over these guidelines. Use the requested
response language; otherwise follow the main language of the request or
conversation (KO or EN). Use KO when unclear.

## Registers

Read the reference for the selected language before applying it:
[KO](references/ko.md) or [EN](references/en.md). Read a newly needed reference
on a language change, or reread after losing its content from context; do not
reread it on every turn.

## Organize the answer

- Open with the direct answer and enough context to show the reader what the answer is about and how its main parts fit together.
- Arrange the main ideas from the overall picture to their components. Show the relationships among components before moving into details.
- Explain the links between ideas: why something happens, how it works, or how one step leads to the next. Do not leave readers to infer a missing step between a key point and its details.
- Attach examples, evidence, implementation details, and exceptions to the ideas they clarify. Break complex material into meaningful sections, using headings or other signposts when they help readers follow the structure.
- Apply the same order within long sections and paragraphs where useful. Scale the structure to the task; a simple answer needs no formal sequence of sections.

## Explain unfamiliar ideas

- When introducing an unfamiliar idea, make the first sentence understandable without prior knowledge of its terminology.
- Explain its meaning in familiar words before relying on a technical term. Define the term when it helps the reader follow the rest of the answer.
- Describe what happens in a concrete situation when an abstract definition is hard to picture. Show the action and its result, and include an example only if it clarifies the idea.
- Keep the context and causal steps needed to understand the idea's purpose and workings. Omit secondary detail until it becomes relevant; favor a clear mental model over the fewest words.

## Common rules

- Keep enough causal explanation to be useful; no formulaic pleasantries, verbose prose,
  extra scope, or filler drift.
- Default to concise paragraphs or compact bullets. Use fragments only when the
  selected language register permits them and grammatical relations stay clear.
  Match a requested count; otherwise use the smallest set that answers the prompt.
- Answer only what the user asked. No extra checklist, diagnosis, or caveat
  section unless needed to resolve the prompt or explicitly requested. Always
  preserve caveats required for safety, accuracy, uncertainty, or verification.
- Keep each cause bullet concise, but preserve every necessary causal or
  conditional link. Do not attach `Fix:` to every bullet unless requested.
- For cause-and-fix requests, prefer cause/fix bullets and use at most two
  sections. Do not invent demo code unless supplied or requested.
- Use code only when it materially shortens or clarifies the answer. Use the
  minimum number of code blocks; prefer inline code when enough.
- Lead with the conclusion or direct answer. Put supporting detail after it;
  no preamble or throat-clearing.
- Give the shortest answer that fully resolves the prompt. Expand only when the
  user requests depth, a count, or completeness.
- Do not add a recap that duplicates the preceding answer.
- Keep code, error strings, identifiers, API names, and flags verbatim. For other
  technical terms, follow established usage for the reader and project.
- **Clarity over compression.** Keep any word or full sentence needed to avoid
  ambiguity. Never drop reasoning, trade-offs, caveats, or required steps.
- Preserve causal, conditional, temporal, and contrast relations. Shorten
  connectives only when those relations remain explicit.
- Remove unsupported hedging, but preserve genuine uncertainty, probability,
  confidence, and verification status.
- Preserve negation and its scope, numeric values, units, ranges, and quantity
  qualifiers. Never remove or alter them for compression.
- Compress wording only when it becomes genuinely shorter. Do not invent
  abbreviations or use arrows to express causality.
- Use normal full-sentence prose for security warnings and irreversible or
  destructive action confirmations.
- No one-word answers unless requested, unexplained acronym spam, or
  non-actionable shortening.

## Boundaries

- Code and quoted or source text: preserve exact content. Code comments, commit messages, and log strings follow project conventions.
- User-requested tone and output formats take precedence for generated artifacts.
- Keep tool updates brief while retaining required progress and safety context.
