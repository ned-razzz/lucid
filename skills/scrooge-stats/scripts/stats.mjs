#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const FIELDS = {
  inputTokens: 'input_tokens',
  outputTokens: 'output_tokens',
  reasoningOutputTokens: 'reasoning_output_tokens',
  cacheReadTokens: 'cached_input_tokens',
};

function readUsage(usage) {
  if (!usage || typeof usage !== 'object') return null;
  const result = Object.fromEntries(Object.entries(FIELDS).map(([key, field]) => {
    const value = usage[field];
    return [key, Number.isSafeInteger(value) && value >= 0 ? value : null];
  }));
  return Object.values(result).some(value => value !== null) ? result : null;
}

export function parseCodexSession(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  let total = null;
  let fallback = null;
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue;
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue; // A live log may end with a partially written line.
    }
    if (entry?.type !== 'event_msg' || entry.payload?.type !== 'token_count') continue;
    const info = entry.payload.info;
    const cumulative = readUsage(info?.total_token_usage);
    if (cumulative) {
      // Latest cumulative snapshot wins; repeated events never add tokens.
      total = cumulative;
      continue;
    }
    const usage = readUsage(info?.last_token_usage);
    if (!usage) continue;
    if (fallback === null) {
      fallback = usage;
    } else {
      for (const key of Object.keys(FIELDS)) {
        // A missing delta makes that field's total unknown, not zero.
        fallback[key] = fallback[key] === null || usage[key] === null
          ? null : fallback[key] + usage[key];
      }
    }
  }
  const usage = total ?? fallback;
  if (!usage) throw new Error('No recorded token usage available in this session log.');
  return {
    ...usage,
    visibleOutputTokens: usage.outputTokens !== null && usage.reasoningOutputTokens !== null
      && usage.reasoningOutputTokens <= usage.outputTokens
      ? usage.outputTokens - usage.reasoningOutputTokens : null,
  };
}

export function formatStats(usage, share = false) {
  const number = value => value === null ? 'unavailable' : value.toLocaleString('en-US');
  const rows = [
    ['Input tokens', usage.inputTokens],
    ['Output tokens (including reasoning)', usage.outputTokens],
    ['Non-reasoning output tokens (prose + tools)', usage.visibleOutputTokens],
    ['Reasoning tokens', usage.reasoningOutputTokens],
    ['Cache-read tokens (part of input)', usage.cacheReadTokens],
  ];
  if (share) return rows.map(([label, value]) => `${label}: ${number(value)}`).join(' | ') + '\n';
  return 'Scrooge Stats — recorded Codex usage\n'
    + rows.map(([label, value]) => `${label}: ${number(value)}`).join('\n') + '\n';
}

function main() {
  try {
    const { values } = parseArgs({ options: {
      'session-file': { type: 'string' },
      share: { type: 'boolean', default: false },
    } });
    if (!values['session-file'] || values['session-file'].startsWith('--')) {
      throw new Error('Usage: node stats.mjs --session-file <session.jsonl> [--share]');
    }
    process.stdout.write(formatStats(parseCodexSession(values['session-file']), values.share));
  } catch (error) {
    process.stderr.write(`Scrooge Stats: ${error.message}\n`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
