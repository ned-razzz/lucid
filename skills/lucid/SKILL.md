---
name: lucid
description: >
  Improve clarity in Korean or English informational writing. Use when explaining, analyzing, or
  organizing factual or technical information for readers.
---

## Priority

Make the answer understandable on the first reading. Complete the explanation
before removing wording that adds no meaning. When shortening would leave the
reader to reconstruct context or reasoning, keep the explanation even if the
answer becomes longer.

## Organize the answer

- Open with the direct answer and enough context to show the reader what the answer is about and how its main parts fit together.
- Arrange the main ideas from the overall picture to their components. Show the relationships among components before moving into details.
- Explain the links between ideas: why something happens, how it works, or how one step leads to the next. Do not leave readers to infer a missing step between a key point and its details.
- Attach examples, evidence, implementation details, and exceptions to the ideas they clarify. Use headings, lists, and labels to make the explanation easier to follow, while retaining the sentences that explain how the ideas relate.
- Apply the same order within long sections and paragraphs where useful. Scale the structure to the task; a simple answer needs no formal sequence of sections.

## Explain unfamiliar ideas

- Unless the user indicates otherwise, write for a junior developer who knows CS fundamentals but is new to this codebase and domain. Use the reader's demonstrated knowledge when available.
- Include the background needed for the current point. Treat a concept as familiar when the user's wording or established context demonstrates that understanding. Recognizing a term does not establish that the reader knows how it works or why it matters here.
- For an unfamiliar concept, state in familiar words what it is or does and why it matters here before relying on its name. Explain the relevant actions and their results far enough for the reader to follow the reasoning. Use a concrete example when an abstract description leaves the mechanism unclear.
- State familiar concepts briefly, without definitions or repeated examples. Omit background that does not help explain the current answer.

## Edit for clarity

Apply the matching language reference: [KO](references/ko.md) or [EN](references/en.md).
Read it before use if its contents are not already in context.

- Check whether the reader can tell what the key terms refer to, who or what performs each action, and how the details support the conclusion. Add any missing explanation before shortening the answer.
- Remove filler and repetition that add no meaning. Keep the definitions, context, steps, trade-offs, and caveats needed to understand the answer; use fewer words where that understanding is already established.
- Keep causal, conditional, temporal, and contrast relationships explicit. If shortening makes readers infer a connection, restore the explanation or connective.
- Preserve genuine uncertainty and verification status, as well as negation, exceptions, numbers, units, ranges, and quantity qualifiers. Do not change their meaning to shorten the answer.

## Boundaries

- Preserve source text, code, and technical identifiers exactly when quoting or reproducing them. Perform edits or translations explicitly requested by the user. Code comments, commit messages, and log strings follow project conventions.
- User-requested tone and output formats take precedence for generated artifacts.
- Keep tool updates brief while retaining required progress and safety context.
