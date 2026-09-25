<p align="center">
  <img src="assets/logo.svg" width="96" height="96" alt="Scrooge Skills logo" />
</p>

<h1 align="center">Scrooge Skills</h1>

<p align="center">Codex 전용 Agent Skill · 쉽고 명확하게 읽히는 응답</p>

<p align="center">
  <a href="https://github.com/ned-razzz/scrooge-mode/stargazers"><img src="https://img.shields.io/github/stars/ned-razzz/scrooge-mode?style=flat&color=yellow" alt="GitHub stars" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/ned-razzz/scrooge-mode?style=flat" alt="MIT license" /></a>
</p>

---

# Overview

Scrooge Skills는 Codex의 응답을 쉽고 빠르게 이해할 수 있도록 가독성과 직관성을 높이는 Agent Skill이다. 필요한 정보는 유지하면서 불필요한 표현을 덜어내고, 내용의 흐름이 한눈에 보이도록 설명을 구성한다.

Codex 전용의 표준 Agent Skills만 사용하도록 경량화했다.

한국어와 영어를 지원한다.

Scrooge Skills는 [`scrooge-mode`](https://github.com/Kir93/scrooge-mode)를 기반으로 만들었으며, 한국어 출력 규칙은 [`fluent-korean`](https://github.com/snflkd/fluent-korean)의 언어 원칙을 참고해 보완했다.

# Why Use?

AI 에이전트가 코드를 빠르게 생성할수록, 그 결과를 읽고 이해하고 검토하는 일이 더 중요해진다.

Scrooge Skills는 응답을 짧게 만드는 데 그치지 않고, 내용을 쉽게 파악할 수 있도록 설명 방식과 글의 구조를 다듬는다.

Scrooge Skills는 Codex의 응답에 다음 원칙을 적용한다.

- 먼저 전체 그림을 보여주고, 핵심 구조와 요소 간의 관계를 설명한 뒤 필요한 세부 정보를 더한다.
- 어려운 개념은 쉬운 말과 구체적인 설명으로 풀어 쓴다.
- 의미와 필요한 정보는 유지하면서 반복과 군더더기를 줄인다.

이를 통해 응답의 요지를 빠르게 파악하고, 세부 내용과 그 근거까지 명확하게 이해할 수 있다.

# Mechanism

Scrooge Skills는 Codex의 표준 Agent Skill 구조를 사용한다. `SKILL.md`가
`$scrooge` 명령을 해석하고 공통 응답 규칙을 적용하며, 선택한 언어에 따라
`references/ko.md` 또는 `references/en.md`를 읽는다.

`$scrooge ko` 또는 `$scrooge en`은 언어를 현재 대화에 고정한다. 언어를
지정하지 않은 `$scrooge`는 요청과 대화의 주 언어를 기준으로 레지스터를
선택한다. `$scrooge off`는 응답 규칙과 언어 고정을 해제한다. 별도 hooks, runtime,
백그라운드 프로세스 없이 Codex가 응답을 생성할 때만 적용된다.

## How responses become clearer

먼저 결론과 전체 맥락을 제시하고, 필요한 이유와 세부 사항을 이어서 설명한다.
원인과 결과, 조건과 예외가 드러나도록 문장과 목록을 구성한다. 어려운 개념은
독자가 아는 표현으로 풀어 쓰고, 이해에 도움이 될 때만 예시나 코드를 사용한다.

의미를 더하지 않는 인사말과 반복은 덜어낸다. 짧게 쓰는 것보다 한 번에 이해할
수 있게 쓰는 것을 우선하며, 필요한 설명을 길이 때문에 생략하지 않는다.

## Preserve meaning and accuracy

쉽게 설명하더라도 판단에 필요한 정보와 정확성은 유지한다.

- 원인·조건·시간 순서·대조 관계
- 부정의 범위, 숫자, 단위, 범위, 수량 한정
- 검증 상태와 실제 불확실성·확률·신뢰도
- 안전, 정확성, 검증에 필요한 주의사항과 필수 단계

기술 식별자, 코드, 오류 문자열, API 이름, 플래그, 인용한 원문은 바꾸지 않는다.
확인되지 않은 추측은 사실처럼 단정하지 않고, 불확실한 이유와 확인이 필요한
부분을 밝힌다. 임의의 약어나 기호로 설명을 대신하지 않는다.

## Korean register

한국어는 `~다`, `~한다`, `~된다` 등의 완결문을 기본으로 한다. 제목·표·체크리스트·
짧은 상태 보고에서는 명사구나 `~함` 체를 쓸 수 있다. 문장의 길이보다 누가 무엇을
왜 하는지 자연스럽게 읽히는지를 우선한다.

주어와 조사는 생략해도 관계가 분명할 때만 덜어낸다. 원인·조건·대조를 나타내는
연결 표현은 독자가 문맥을 추측하지 않아도 되도록 유지한다.

불필요한 완곡 표현, 반복, 상투적 인사말은 제거하되 실제 불확실성은 보존한다.
기술 용어는 정착한 한국어 번역이나 음역을 우선하고, 정착하지 않았으면 원어를
그대로 쓴다. 인용문, 고유명사, 식별자, 경로, 명령어는 원문을 유지한다.

# Installation

PowerShell에서 실행:

```powershell
git clone https://github.com/ned-razzz/scrooge-mode.git
cd scrooge-mode
.\scripts\install.ps1
```

기본 설치 경로는 `$CODEX_HOME\skills`이며, `CODEX_HOME`이 없으면 `%USERPROFILE%\.codex\skills`를 사용한다. 설치 후 Codex를 다시 시작한다.

# How to Use

설치 후 대화에서 다음 명령을 사용한다.

- `$scrooge [ko|en]`: 선택한 언어의 응답 규칙을 현재 대화에 적용
- `$scrooge`: 대화 언어에 맞춰 응답 규칙을 자동 선택
- `$scrooge off`: 응답 규칙과 언어 고정 해제

활성화 상태는 대화가 끝나거나 `off`로 해제할 때까지 유지된다.
