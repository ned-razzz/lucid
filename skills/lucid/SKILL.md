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

- When introducing an unfamiliar idea, make the first sentence understandable without prior knowledge of its terminology.
- Explain its meaning in familiar words before relying on a technical term. Define the term when it helps the reader follow the rest of the answer.
- Describe what happens in a concrete situation when an abstract definition is hard to picture. Show the action and its result, and include an example only if it clarifies the idea.
- Keep the context and causal steps needed to understand the idea's purpose and workings. Omit secondary detail until it becomes relevant; favor a clear mental model over the fewest words.

## Edit for clarity

- **Clarity over compression.** Remove wording that adds no meaning, but keep the explanation, steps, trade-offs, and caveats readers need.
- Keep causal, conditional, temporal, and contrast relationships explicit. If shortening makes readers infer a connection, restore the explanation or connective.
- Preserve genuine uncertainty and verification status, as well as negation, exceptions, numbers, units, ranges, and quantity qualifiers. Do not change their meaning to shorten the answer.

## Boundaries

- Code and quoted or source text: preserve exact content. Code comments, commit messages, and log strings follow project conventions.
- User-requested tone and output formats take precedence for generated artifacts.
- Keep tool updates brief while retaining required progress and safety context.
