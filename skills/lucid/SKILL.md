---
name: lucid
description: >
  Improve clarity in Korean or English answers and reader-facing documentation.
  Use when explaining or analyzing information, or writing and editing technical
  documents, design documents, and work logs.
---

## Priority

Make the output understandable on the first reading. Complete the explanation
before removing wording that adds no meaning. When shortening would leave the
reader to reconstruct context or reasoning, keep the explanation even if the
output becomes longer.

## Match the output and audience

- For conversational answers, address the current question and use the user's demonstrated understanding and shared context.
- For reader-facing documentation, apply [Documentation](references/documentation.md). Read it before use if its contents are not already in context.
- Choose the depth of explanation from the task's purpose and the intended readers' knowledge. When familiarity with a concept is unclear, briefly explain what readers need to follow the content.

## Organize the content

- Open with the answer or document purpose and enough context to show readers what the content is about and how its main parts fit together.
- Arrange the main ideas from the overall picture to their components. Show the relationships among components before moving into details.
- Explain the links between ideas: why something happens, how it works, or how one step leads to the next.
- Attach examples, evidence, implementation details, and exceptions to the ideas they clarify. Use headings, lists, and labels when they make the explanation easier to follow.
- Give each paragraph or list item one coherent main point, grouping related functions that readers need to understand or implement together. Split groups when distinct purposes or responsibilities become unclear, and keep supporting steps, conditions, and exceptions with the function they explain. Scale the structure to the task and follow the document's purpose and required format.

## Explain unfamiliar ideas

- Include the background needed for the current point. Treat a concept as familiar when the audience description, wording, or relevant context demonstrates that understanding. Recognizing a term does not establish that the reader knows how it works or why it matters here.
- For an unfamiliar concept, state in familiar words what it is or does and why it matters here before relying on its name, then use the term consistently. Use a concrete example when an abstract description leaves the mechanism unclear.
- State familiar concepts briefly, without definitions or repeated examples. Omit background that does not help readers understand the current point.

### Example: connection pooling

Assume the reader is new to connection pooling.

Too compressed: "A connection pool reuses database connections to reduce connection costs."

Clear: "Opening a database connection requires setting up communication and authenticating. A connection pool keeps available connections, lends them to requests, and takes them back for reuse when the work finishes. This reduces the need to open a new connection for each request."

The compressed version leaves the reader to infer what the pool does and which work it avoids. The clear version supplies those links.

## Edit for clarity

- Check whether the reader can tell what the key terms refer to, who or what performs each action, and how the details support the conclusion.
- Remove wording only when it adds no meaning, including filler, stock pleasantries, and redundant repetition.
- Keep causal, conditional, temporal, and contrast relationships explicit. If shortening makes readers infer a connection, restore the explanation or connective.
- Preserve genuine uncertainty and verification status, as well as negation, exceptions, numbers, units, ranges, and quantity qualifiers. Do not change their meaning to shorten the output.
- Preserve source text, code, and technical identifiers exactly when quoting or reproducing them.

### English expression

- Prefer complete sentences. Fragments work in headings, tables, and brief status updates when their meaning is clear.
- Keep articles, subjects, and connectives when they make the sentence natural or show how ideas relate.
- Replace wordy phrases with shorter ones of the same meaning, such as `use` for `make use of`. Preserve the original nuance.

### Korean expression

For Korean output, apply [KO](references/ko.md). Read it before use if its
contents are not already in context.
