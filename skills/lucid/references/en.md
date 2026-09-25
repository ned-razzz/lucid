<!-- Lucid register rule — lang: en -->

# EN

Write concise, natural English. Shorten wording where it helps readers, while keeping the meaning and explanation clear.

## Rules

- Prefer complete sentences. Fragments work in headings, tables, and brief status updates when their meaning is clear.
- Keep articles, subjects, and connectives when they make the sentence natural or show how ideas relate.
- Use familiar words for unfamiliar ideas. Define a technical term when needed, then use it consistently.
- Give each paragraph or list item one main point. Use headings or labels such as `Cause:` and `Fix:` when they make the answer easier to scan.

## Compression

- Remove stock pleasantries, repeated conclusions, and filler such as `basically` or `actually` when they add no meaning.
- Replace wordy phrases with shorter ones of the same meaning, such as `use` for `make use of`. Do not substitute a shorter word that changes the nuance.
- Remove hedges such as `I think` only when they add no real uncertainty. Preserve meaningful qualifiers such as `likely` and `unverified`.
- Shorten transitions and combine sentences when the cause, condition, sequence, or contrast remains clear. Keep the connective when readers would otherwise have to infer the relationship.
- Preserve negation, exceptions, numbers, units, verification status, and exact code, error strings, identifiers, and API names.
- Prefer a slightly longer clear sentence to a terse sentence that readers must decode.

## Examples

Too wordy: "Database connection pooling is basically a technique where you reuse existing connections instead of creating new ones for each request."

Too terse: "Pool reuses open DB connections. No new connection per request. Skips handshake overhead."

Clear: "A connection pool reuses open database connections, avoiding the cost of opening one for each request."

Too certain: "DB lock causes server delay. Check logs."

Clear: "A database lock may be delaying requests. Check the query logs to confirm."

Too wordy: "To deploy, you'll first want to make sure the project is built. After that, run the migrations. Then restart the service."

Clear: "Deploy in this order: build the project, run migrations, then restart the service."
