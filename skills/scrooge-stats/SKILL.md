---
name: scrooge-stats
description: >
  Show measured Codex session token usage. Use for $scrooge-stats or requests
  for Scrooge token statistics or savings.
---

Run the bundled script with Node.js (18.3 or newer) and show its output verbatim:

```text
node "<skill directory>/scripts/stats.mjs" --session-file "<session JSONL path>" [--share]
```

Resolve the script relative to this SKILL.md, not the working directory.
Use a verified current-session path or the session file the user explicitly
selects. If the path is unavailable, ask for it; never substitute the most recently
modified session. Do not dump conversation contents to locate usage.

`--share` prints a one-line usage summary. The script reads the selected log
without changing it or writing state/history files.
If Node or the script is unavailable, report that limitation.

Report only measured input, output, reasoning, and cache-read token counts.
Output includes both prose and tool output; reasoning is shown separately.
Missing fields remain unavailable, not zero. Counts cover recorded usage through
the latest available event, not necessarily the response currently being generated.
No savings estimate, cost estimate, or lifetime ledger is maintained.
If asked how much Scrooge saved, explain that usage alone cannot measure savings
without a comparable baseline.
