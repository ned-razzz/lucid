<!-- Lucid register rule — lang: en -->

# EN

Write natural English that the reader can understand on the first reading. Apply the shared explanation-first priority, using additional sentences when they clarify unfamiliar ideas or the links between them.

## Rules

- Prefer complete sentences. Fragments work in headings, tables, and brief status updates when their meaning is clear.
- Keep articles, subjects, and connectives when they make the sentence natural or show how ideas relate.
- Use familiar words for unfamiliar ideas. Define a technical term when needed, then use it consistently.
- Give each paragraph or list item one main point. Use headings or labels such as `Cause:` and `Fix:` when they make the answer easier to scan. Include sentences explaining how a cause leads to a result or how a proposed solution addresses the cause.

## Editing

- Remove stock pleasantries, repeated conclusions, and filler such as `basically` or `actually` when they add no meaning.
- Replace wordy phrases with shorter ones of the same meaning, such as `use` for `make use of`. Do not substitute a shorter word that changes the nuance.
- Remove hedges such as `I think` only when they add no real uncertainty. Preserve meaningful qualifiers such as `likely` and `unverified`.
- Shorten transitions and combine sentences when the cause, condition, sequence, or contrast remains clear. Keep the connective when readers would otherwise have to infer the relationship.
- Preserve negation, exceptions, numbers, units, verification status, and exact code, error strings, identifiers, and API names.
- Prefer a slightly longer clear sentence to a terse sentence that readers must decode.

## Examples

### Unfamiliar concept

Assume the reader is new to connection pooling. Compare whether the explanation makes sense without prior knowledge, rather than judging its length.

Wordy: "It is worth noting that opening a database connection basically involves setting up communication and authenticating. A connection pool is essentially a mechanism that keeps available connections, lends them to requests, and takes them back for reuse when the work finishes. This makes it possible to reduce the need to open a new connection for each request."

Too compressed: "A connection pool reuses database connections to reduce connection costs."

Clear: "Opening a database connection requires setting up communication and authenticating. A connection pool keeps available connections, lends them to requests, and takes them back for reuse when the work finishes. This reduces the need to open a new connection for each request."

The compressed version leaves the reader to infer what the pool does and which work it avoids. The clear version supplies those links while removing empty phrasing.

### Familiar workflow

If the reader already understands the deployment workflow and asks for a reminder, a short sequence is enough:

"Build the project, run migrations, then restart the service."

### Unverified cause

Too certain: "A database lock is delaying requests."

Clear: "A database lock may be delaying requests. Check the query logs for lock waits."
