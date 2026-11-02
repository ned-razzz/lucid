<p align="center">
  <img src="assets/lucid-light.svg" width="96" height="96" alt="Lucid light logo" />
</p>

<h1 align="center">Lucid</h1>

<p align="center">Agent Skills · Clear answers and documentation</p>

<p align="center">
  <a href="https://github.com/ned-razzz/Lucid/stargazers"><img src="https://img.shields.io/github/stars/ned-razzz/Lucid?style=flat&color=yellow" alt="GitHub stars" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/ned-razzz/Lucid?style=flat" alt="MIT license" /></a>
</p>

---

Lucid is an Agent Skill that makes Korean and English answers and documentation
easier to read and understand. It explains unfamiliar terms, fills gaps in reasoning,
and removes unnecessary repetition while preserving accuracy and the details readers need.

Use it to explain technical concepts, summarize analysis, or write technical documents,
design documents, and work logs. It works with coding agents that support the standard
Agent Skills format.

## Installation

Copy the entire `skills/lucid` directory into your agent's skills directory.
Check your agent's documentation for the supported location. Common locations include:

- For one project: `.agents/skills/lucid`
- For use across projects: `~/.agents/skills/lucid`

On Windows, run this command from the repository root to install into
`~/.agents/skills/lucid`:

```powershell
./scripts/install-lucid-skill.ps1
```

## Usage

Your agent uses the skill description to decide when to apply Lucid.
Once Lucid is installed, use the explicit skill syntax supported by your agent:
`/lucid` or `$lucid`. For example:

```text
/lucid Explain what caused this error and how to fix it.
```
```text
$lucid core Summarize this design and the reasons behind its choices.
```

Choose an explanation level below. The default is `flow`.
Every level aims for easy reading; the level controls how fully Lucid explains
the reasoning and process.

| Level | Scope |
| --- | --- |
| `core` | Give the main answer and its essential reason concisely. |
| `flow` (default) | Lead with the answer, then connect the reasons and context needed to understand it. |
| `steps` | Start with an overview, then explain relevant intermediate steps and examples. |

See the [skill instructions](skills/lucid/SKILL.md) for explanation and language principles,
and the [documentation guide](skills/lucid/references/documentation.md) for guidance
on writing for a document's readers and purpose.

## Benchmark

The [ROS 2 QoS question](evals/questions/02-ros2-qos.md) asks why a subscriber
receives no camera images when the publisher uses `BEST_EFFORT` and the subscriber
uses `RELIABLE`. The other QoS settings are compatible.

The table shows all three answers from the same evaluation run, in the original Korean.

> **Note — One-sentence prompt:** 한국어로 쉽고 자세하고 간결하게 설명해. 독자를 기본적인 개발 지식은 있지만 특정 기술이나 프로젝트의 내부 맥락까지 모두 알고 있지는 않은 주니어 개발자로 상정하고 답변해.

| Condition | Answer |
| --- | --- |
| Baseline | 발행자의 `BEST_EFFORT`는 메시지 전달을 보장하지 않지만, 구독자의 `RELIABLE`은 전달 보장을 요구합니다. 따라서 두 reliability 정책이 호환되지 않아 구독이 연결되지 않습니다.<br><br>구독자의 reliability를 `BEST_EFFORT`로 바꾸면 발행자와 호환되어 메시지를 받을 수 있습니다. `BEST_EFFORT` 구독자는 `RELIABLE` 발행자도 받을 수 있으므로, 유연성을 원한다면 구독자 QoS를 `BEST_EFFORT`로 설정하면 됩니다. |
| Lucid (`flow`) | 구독자가 `RELIABLE`을 요구하지만 발행자는 `BEST_EFFORT`만 제공하므로 QoS가 호환되지 않는다. 따라서 구독자는 발행자의 메시지를 받지 못한다.<br><br>구독자의 reliability를 `BEST_EFFORT`로 바꾸면 된다. `BEST_EFFORT` 구독자는 `BEST_EFFORT`와 `RELIABLE` 발행자 모두와 호환된다. 반면 `RELIABLE` 구독자는 `RELIABLE` 발행자와만 호환된다. |
| One-sentence prompt | ROS 2에서는 토픽 이름과 메시지 타입이 같아도 **QoS가 서로 호환되지 않으면** 메시지를 주고받지 못할 수 있습니다.<br><br>`RELIABLE` 구독자는 메시지 전달을 보장하는 연결을 요구하지만, `BEST_EFFORT` 발행자는 전달을 보장하지 않습니다. 따라서 이 조합은 호환되지 않아 구독자가 영상을 받지 못합니다.<br><br>구독자의 reliability를 `BEST_EFFORT`로 바꾸면 됩니다. 그러면 발행자의 `BEST_EFFORT`와 호환되어 메시지를 받을 수 있습니다. `BEST_EFFORT` 구독자는 `RELIABLE` 발행자와도 호환되므로, 구독자 쪽을 `BEST_EFFORT`로 설정하는 것이 흔히 쓰이는 해결 방법입니다. |

Generate answers to the same questions under three conditions: a baseline,
Lucid, and a one-sentence prompt. Compare the answers yourself; there is no automatic scoring.
Python 3.11 or later and a signed-in Codex CLI are required.

Run from the repository root:

```powershell
python -X utf8 evals/benchmark.py
```

## Credits and license

Lucid is based on [`scrooge-mode`](https://github.com/Kir93/scrooge-mode).
Its Korean language guidance also draws on the principles in
[`fluent-korean`](https://github.com/snflkd/fluent-korean).

Released under the [MIT license](LICENSE).
