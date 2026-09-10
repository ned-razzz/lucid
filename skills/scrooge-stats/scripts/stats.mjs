#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
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

function matchesSession(filePath, sessionId) {
  if (path.basename(filePath, '.jsonl').endsWith(sessionId)) return true;
  let fd;
  try {
    fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(65536);
    const length = fs.readSync(fd, buffer, 0, buffer.length, 0);
    const firstLine = buffer.subarray(0, length).toString('utf8').split('\n', 1)[0];
    const meta = JSON.parse(firstLine);
    return meta?.type === 'session_meta'
      && (meta.payload?.id === sessionId || meta.payload?.session_id === sessionId);
  } catch {
    return false;
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
}

export function findCodexSession(sessionId, codexHome = process.env.CODEX_HOME) {
  if (!sessionId) return null;
  const root = path.join(codexHome || path.join(os.homedir(), '.codex'), 'sessions');
  const pending = [root];
  while (pending.length) {
    const directory = pending.pop();
    let entries;
    try {
      entries = fs.readdirSync(directory, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const filePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        pending.push(filePath);
      } else if (entry.isFile() && entry.name.endsWith('.jsonl')
        && matchesSession(filePath, sessionId)) {
        return filePath;
      }
    }
  }
  return null;
}

export function formatStats(usage, share = false) {
  const number = value => value === null ? 'unavailable' : value.toLocaleString('en-US');
  const rows = [
    ['Input tokens', usage.inputTokens],
    ['Output tokens (including reasoning)', usage.outputTokens],
    ['Non-reasoning output tokens (assistant text + tool calls)', usage.visibleOutputTokens],
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
    const explicit = values['session-file'];
    if (explicit?.startsWith('--')) {
      throw new Error('Usage: node stats.mjs [--session-file <session.jsonl>] [--share]');
    }
    const sessionFile = explicit || findCodexSession(
      process.env.CODEX_SESSION_ID || process.env.CODEX_THREAD_ID
    );
    if (!sessionFile) {
      throw new Error(
        'Current Codex session log not found; pass --session-file <session.jsonl>.'
      );
    }
    process.stdout.write(formatStats(parseCodexSession(sessionFile), values.share));
  } catch (error) {
    process.stderr.write(`Scrooge Stats: ${error.message}\n`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
