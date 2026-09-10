import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { findCodexSession, parseCodexSession } from './stats.mjs';

test('measured usage, missing data, and standalone CLI', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'scrooge-stats-test-'));
  try {
    const file = path.join(dir, 'session.jsonl');
    const event = info => JSON.stringify({ type: 'event_msg', payload: { type: 'token_count', info } });
    const first = { input_tokens: 100, output_tokens: 30, reasoning_output_tokens: 10, cached_input_tokens: 40 };
    const last = { input_tokens: 200, output_tokens: 70, reasoning_output_tokens: 25, cached_input_tokens: 80 };
    fs.writeFileSync(file, [event({ last_token_usage: first }), event({ total_token_usage: first }),
      event({ total_token_usage: last }), event({ total_token_usage: last }), '{partial'].join('\n'));
    assert.deepEqual(parseCodexSession(file), {
      inputTokens: 200, outputTokens: 70, reasoningOutputTokens: 25,
      cacheReadTokens: 80, visibleOutputTokens: 45,
    });
    // Copied script runs outside the repository, with no package.json or state.
    const script = path.join(dir, 'stats.mjs');
    fs.copyFileSync(fileURLToPath(new URL('./stats.mjs', import.meta.url)), script);
    const run = (args, env = process.env) => spawnSync(process.execPath, [script, ...args], {
      cwd: dir, encoding: 'utf8', env,
    });
    const before = fs.readFileSync(file, 'utf8');
    const share = run(['--session-file', file, '--share']);
    assert.equal(share.status, 0, share.stderr);
    assert.equal(share.stdout.trim().split('\n').length, 1);
    assert.match(share.stdout, /Non-reasoning output tokens \(prose \+ tools\): 45/);
    assert.equal(fs.readFileSync(file, 'utf8'), before);
    assert.equal(run([], { ...process.env, CODEX_SESSION_ID: '', CODEX_THREAD_ID: '' }).status, 1);
    assert.equal(run(['--session-file', path.join(dir, 'missing.jsonl')]).status, 1);
    const codexHome = path.join(dir, 'codex');
    const sessions = path.join(codexHome, 'sessions', '2026', '09', '10');
    fs.mkdirSync(sessions, { recursive: true });
    const sessionId = '12345678-test-session';
    const discovered = path.join(sessions, `rollout-2026-09-10-${sessionId}.jsonl`);
    fs.copyFileSync(file, discovered);
    assert.equal(findCodexSession(sessionId, codexHome), discovered);
    const automatic = spawnSync(process.execPath, [script, '--share'], {
      cwd: dir,
      encoding: 'utf8',
      env: { ...process.env, CODEX_HOME: codexHome, CODEX_SESSION_ID: sessionId },
    });
    assert.equal(automatic.status, 0, automatic.stderr);
    assert.match(automatic.stdout, /Non-reasoning output tokens/);
    fs.writeFileSync(file, event({ last_token_usage: first }) + '\n' + event({ last_token_usage: last }));
    assert.equal(parseCodexSession(file).visibleOutputTokens, 65);
    fs.writeFileSync(file, event({ total_token_usage: { output_tokens: 9 } }));
    assert.equal(parseCodexSession(file).visibleOutputTokens, null);
    assert.equal(parseCodexSession(file).inputTokens, null);
    assert.match(run(['--session-file', file]).stdout, /Input tokens: unavailable/);
    fs.writeFileSync(file, event({ last_token_usage: first }) + '\n'
      + event({ last_token_usage: { output_tokens: 9 } }));
    assert.equal(parseCodexSession(file).inputTokens, null);
    fs.writeFileSync(file, event({ total_token_usage: { input_tokens: 0, output_tokens: 0,
      reasoning_output_tokens: 0, cached_input_tokens: 0 } }));
    assert.equal(parseCodexSession(file).visibleOutputTokens, 0);
    fs.writeFileSync(file, '{}\nnull\n{broken');
    assert.throws(() => parseCodexSession(file), /No recorded token usage/);
    const empty = run(['--session-file', file]);
    assert.equal(empty.status, 1);
    assert.match(empty.stderr, /No recorded token usage/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
