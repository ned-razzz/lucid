---
name: lucid
description: >
  Make Korean and English answers and reader-facing documentation easier
  to read and understand. Use when explaining information or writing and
  editing technical documents, design documents, and work logs.
---

## Purpose and approach

- Minimize the effort readers need to understand the content.
- Preserve substantive information and precision while unpacking expressions and reasoning that make readers reconstruct the meaning themselves.
- Keep every level easy to understand. Adjust how fully to explain the reasoning and relevant process, using the four criteria below.

## Explanation level

Accept an optional level argument: `core`, `flow`, or `steps`. Default to `flow` when no level is specified. Recognize the corresponding level number or Korean label as well.

| Criterion | `core` | `flow` | `steps` |
| --- | --- | --- | --- |
| **Make the main point immediately visible.** | Lead with the answer and its essential reason. | Lead with the answer, then explain why. | Lead with the answer and an overview before walking through the process. |
| **Reduce interpretation effort.** | Use familiar, direct wording; briefly unpack necessary terms. | Connect terms to actual actions or situations. | Show meaning through a concrete case or before-and-after comparison when helpful. |
| **Make reasoning easy to follow.** | Include the connections essential to understanding the answer. | Connect causes, actions, and results explicitly. | Show intermediate steps and what changes at each stage. |
| **Explain only what serves the question.** | Keep to the direct answer and its reason. | Include the process and context needed to make sense of the answer. | Provide enough detail for the reader to follow the relevant process themselves. |

## Principles for readability

1. **Use familiar expressions.** Replace rare word combinations and unnecessarily specialized expressions with everyday language.
2. **Simplify sentence structure.** Reduce long modifiers and complex relative clauses, and make the relationship between the subject and predicate clear.
3. **Make abstract expressions concrete.** Replace abstract nouns and sequences of nouns with sentences that show actual actions and situations.
4. **Make logical connections explicit.** Supply omitted explanations between causes, processes, and results as needed.

## Edit for concision

- Keep the explanation as concise as the readability principles allow.
- Remove filler and repeated points.
- Keep background and examples only as detailed as needed for understanding.

### English expression

- Prefer complete sentences. Fragments work in headings, tables, and brief status updates when their meaning is clear.
- Keep articles, subjects, and connectives when they make the sentence natural or show how ideas relate.

### Korean expression

- Default to complete Korean sentences in 한다체 (e.g., `확인했다`, `적용한다`, `문제가 없다`).
- State the subject explicitly when readers might otherwise confuse who acts or what a statement refers to.
- Drop a particle only when agent, object, direction, location, means, and contrast remain equally clear.
- Common expressions to remove include:
    - Empty introductory phrases, such as `사실`, `그냥`, and `기본적으로`, when the sentence conveys the same meaning without them.
    - Response announcements, such as `설명해 드리겠습니다` and `알려드립니다`, when the explanation itself is sufficient.

## References

- For reader-facing documentation, apply [Documentation](references/documentation.md).
