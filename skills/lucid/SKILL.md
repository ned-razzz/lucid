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
- Adjust explanation depth to the selected level and apply the readability principles at every level.

## Explanation level

Accept an optional level argument: `general`, `basic`, or `pro`. Default to `basic` when no level is specified.

| Level | Argument | Intended readers | Explanation approach |
| --- | --- | --- | --- |
| L1 | `general` | General readers with little or no knowledge of the field | Introduce necessary background, explain terms, and use concrete examples. |
| L2 | `basic` | Readers with basic concepts and background knowledge of the field | Build on that foundation and explain unfamiliar concepts and reasoning. |
| L3 | `pro` | Mid-level practitioners with specialized knowledge and practical experience | Use domain terminology and focus on practical decisions, technical details, tradeoffs, and implications. |

## Principles for readability

1. **Use familiar expressions.** Replace rare word combinations and unnecessarily specialized expressions with everyday language.
2. **Simplify sentence structure.** Reduce long modifiers and complex relative clauses, and make the relationship between the subject and predicate clear.
3. **Make abstract expressions concrete.** Replace abstract nouns and sequences of nouns with sentences that show actual actions and situations.
4. **Make logical connections explicit.** Supply omitted explanations between causes, processes, and results as needed.

### Example

- Before: "Without cache invalidation, users may see outdated data."
- After: "When the original data changes, the cached copy must be updated or removed. Otherwise, the old copy remains in the cache, and users who read it may see outdated data."

## Edit for clarity

- Find places where readers would need to guess a term's meaning, infer a missing step, or look back to recover context. Rewrite those places using familiar words, an explicit connection, or a concrete example.
- Remove filler and repetition that do not help readers understand the content.
- Preserve genuine uncertainty and verification status, as well as negation, exceptions, numbers, units, ranges, and quantity qualifiers.
- Preserve source text, code, and technical identifiers exactly when quoting or reproducing them.

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
