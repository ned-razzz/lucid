---
name: lucid
description: >
  Improve clarity in Korean or English informational writing. Use when
  explaining, analyzing, or organizing factual or technical information for
  readers.
---

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

- Unless the user indicates otherwise, write for a junior developer who knows CS fundamentals but is new to this codebase and domain. Use the reader's demonstrated knowledge when available.
- Supply only the background needed for the current point. Explain a concept when it first appears and the reader cannot infer its meaning from context. State concepts the reader already knows briefly, without definitions or repeated examples.
- For such a concept, state in familiar words what it is or does and why it matters here before relying on its name. When useful, show one concrete action and its result. Go one level deeper only if the answer still depends on an unexplained step.
- Check the meaning between claims: if the reader must guess what a component does, how a step causes the next, or why a detail supports the conclusion, add that missing link. Omit background that does not help explain the current answer.

## Edit for clarity

- **Selective detail.** Be concise where the reader has enough context; expand only where understanding would otherwise break. Remove wording that adds no meaning, but keep the explanation, steps, trade-offs, and caveats readers need.
- Keep causal, conditional, temporal, and contrast relationships explicit. If shortening makes readers infer a connection, restore the explanation or connective.
- Preserve genuine uncertainty and verification status, as well as negation, exceptions, numbers, units, ranges, and quantity qualifiers. Do not change their meaning to shorten the answer.

## Boundaries

- Code and quoted or source text: preserve exact content. Code comments, commit messages, and log strings follow project conventions.
- User-requested tone and output formats take precedence for generated artifacts.
- Keep tool updates brief while retaining required progress and safety context.
