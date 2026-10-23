---
name: lucid
description: >
  Make Korean and English answers and reader-facing documentation easier
  to read and understand. Use when explaining information or writing and
  editing technical documents, design documents, and work logs.
---

## Priority

Minimize the effort readers need to understand the answer.
Use familiar language and make necessary reasoning explicit.
Keep the context and detail readers need to follow the explanation
without guessing connections or rereading earlier passages.

## Match the output and audience

- For conversational answers, address the current question and use the user's demonstrated understanding and shared context.
- For reader-facing documentation, apply [Documentation](references/documentation.md). Read it before use if its contents are not already in context.
- Choose the depth of explanation from the task's purpose and the intended readers' knowledge. When familiarity with a concept is unclear, briefly explain what readers need to follow the content.

## Explain unfamiliar ideas

- Include the background needed for the current point. Treat a concept as familiar when the audience description, wording, or relevant context demonstrates that understanding. Recognizing a term does not establish that the reader knows how it works or why it matters here.
- Explain unfamiliar ideas using familiar concepts and concrete actions or relationships. Supply the prerequisites readers need to understand the explanation, and use technical terms consistently. Use a concrete example when an abstract description leaves the mechanism unclear.
- State familiar concepts briefly, without definitions or repeated examples. Omit background that does not help readers understand the current point.

## Edit for clarity

- Read from the intended audience's perspective. Find places where readers would need to guess a term's meaning, infer a missing step, or look back to recover context. Rewrite those places using familiar words, an explicit connection, or a concrete example.
- Remove wording only when it adds no meaning, including filler and stock pleasantries. Keep repeated explanations only when they add a needed distinction.
- Keep causal, conditional, temporal, and contrast relationships explicit. If shortening makes readers infer a connection, restore the explanation or connective.
- Preserve genuine uncertainty and verification status, as well as negation, exceptions, numbers, units, ranges, and quantity qualifiers. Do not change their meaning to shorten the output.
- Preserve source text, code, and technical identifiers exactly when quoting or reproducing them.

### English expression

- Prefer complete sentences. Fragments work in headings, tables, and brief status updates when their meaning is clear.
- Keep articles, subjects, and connectives when they make the sentence natural or show how ideas relate.
- Replace wordy phrases with shorter ones of the same meaning, such as `use` for `make use of`. Preserve the original nuance.

### Korean expression

- Default to short, complete Korean sentences in 한다체 (e.g., `확인했다`, `적용한다`, `문제가 없다`).
- State the subject explicitly when readers might otherwise confuse who acts or what a statement refers to.
- Drop a particle only when agent, object, direction, location, means, and contrast remain equally clear.

Remove expressions that add no information, meaningful nuance, or connection
between ideas. Common cases include:

- Empty introductory phrases, such as `사실`, `그냥`, and `기본적으로`, when the sentence conveys the same meaning without them.
- Response announcements, such as `설명해 드리겠습니다` and `알려드립니다`, when the explanation itself is sufficient.
