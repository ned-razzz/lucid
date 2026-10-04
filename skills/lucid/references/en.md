<!-- Lucid register rule — lang: en -->

# EN

## Rules

- Prefer complete sentences. Fragments work in headings, tables, and brief status updates when their meaning is clear.
- Keep articles, subjects, and connectives when they make the sentence natural or show how ideas relate.

## Editing

- Remove filler such as `basically` or `actually` and stock pleasantries such as `It is worth noting that` when they add no meaning.
- Replace wordy phrases with shorter ones of the same meaning, such as `use` for `make use of`. Do not substitute a shorter word that changes the nuance.
- Remove hedges such as `I think` only when they add no real uncertainty. Preserve meaningful qualifiers such as `likely` and `unverified`.

## Examples

### Unfamiliar concept

Assume the reader is new to connection pooling. Compare whether the explanation makes sense without prior knowledge, rather than judging its length.

Wordy: "It is worth noting that opening a database connection basically involves setting up communication and authenticating. A connection pool is essentially a mechanism that keeps available connections, lends them to requests, and takes them back for reuse when the work finishes. This makes it possible to reduce the need to open a new connection for each request."

Too compressed: "A connection pool reuses database connections to reduce connection costs."

Clear: "Opening a database connection requires setting up communication and authenticating. A connection pool keeps available connections, lends them to requests, and takes them back for reuse when the work finishes. This reduces the need to open a new connection for each request."

The compressed version leaves the reader to infer what the pool does and which work it avoids. The clear version supplies those links while removing empty phrasing.
