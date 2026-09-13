<p align="center">
  <img src="assets/logo.svg" width="96" height="96" alt="Scrooge Skills logo" />
</p>

<h1 align="center">Scrooge Skills</h1>

<p align="center">Codex 전용 Agent Skill · 적은 토큰으로 간결한 응답</p>

<p align="center">
  <a href="https://github.com/ned-razzz/scrooge-mode/stargazers"><img src="https://img.shields.io/github/stars/ned-razzz/scrooge-mode?style=flat&color=yellow" alt="GitHub stars" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/ned-razzz/scrooge-mode?style=flat" alt="MIT license" /></a>
</p>

---

## Overview

Scrooge Skills는 Codex 응답의 기술 정보는 유지하면서 불필요한 표현과 출력 토큰을 줄이는 Agent Skill이다. 한국어와 영어를 지원한다.

원본 프로젝트의 Claude Code용 skills와 hooks 패키지를 fork해, Codex 전용의 표준 Agent Skills만 사용하도록 경량화했다.

Scrooge Skills는 [`scrooge-mode`](https://github.com/Kir93/scrooge-mode)를 기반으로 만들었으며, 한국어 출력 규칙은 [`fluent-korean`](https://github.com/snflkd/fluent-korean)의 언어 원칙을 참고해 보완했다.

## Demo

## Why Use?

AI agent 덕분에 코드 생성은 더 이상 소프트웨어 개발의 병목이 아니다. 이제 핵심 병목은 생성된 코드와 구현 내용을 읽고 이해하는 일이다.

Scrooge Skills는 내용을 생략하지 않으면서 출력을 최대한 압축해 가독성과 내용 이해 속도를 높인다. 필요한 정보는 유지하고 불필요한 표현만 줄여, 응답을 빠르게 파악하고 다음 작업으로 넘어갈 수 있게 한다.

출력 토큰량이 줄어드는 것도 이점이다. 일반적으로 출력 토큰이 가장 비싸므로 응답을 짧게 만들어 비용을 아낄 수 있다. 다만 스킬을 읽고 적용하는 데 입력 토큰이 추가되므로, 실제 절약 효과는 대화와 사용 상황에 따라 달라질 수 있다.

## Mechanism

Scrooge Skills는 Codex의 표준 Agent Skill 구조를 사용한다. `SKILL.md`가
`$scrooge` 명령을 해석하고 공통 압축 규칙을 적용하며, 선택한 언어의
`references/ko.md` 또는 `references/en.md`를 레지스터로 불러온다.

`$scrooge ko` 또는 `$scrooge en`은 언어를 현재 대화에 고정한다. 언어를
지정하지 않은 `$scrooge`는 요청과 대화의 주 언어를 기준으로 레지스터를
선택한다. `$scrooge off`는 압축과 언어 고정을 해제한다. 별도 hooks, runtime,
백그라운드 프로세스 없이 Codex가 응답을 생성할 때만 적용된다.

### What gets compressed

의미를 더하지 않는 인사말, 반복, 상투적 도입부, 장황한 표현을 제거한다.
짧은 동의어, 직접적인 결론, 필요한 최소 코드 블록을 우선한다. 원인과 해결을
설명할 때도 같은 내용을 반복하지 않고 짧은 문장이나 구조화된 레이블로 묶는다.

기술 식별자, 코드, 오류 문자열, API 이름, 플래그, 인용한 원문은 바꾸지 않는다.
그 밖의 기술 용어는 독자와 프로젝트에서 이미 쓰는 표기를 따른다. 따라서
압축을 위해 임의의 약어를 만들거나 기호만으로 인과관계를 표현하지 않는다.

### Meaning-preserving guardrails

압축은 삭제 규칙이 아니라 의미 보존 규칙과 함께 적용된다. 다음 정보는 짧게
만들더라도 유지한다.

- 원인·조건·시간 순서·대조 관계
- 부정의 범위, 숫자, 단위, 범위, 수량 한정
- 검증 상태와 실제 불확실성·확률·신뢰도
- 안전, 정확성, 검증에 필요한 주의사항과 필수 단계

이 장치는 짧은 답변이 단정적이거나 모호해지는 것을 막는다. 예를 들어 확인되지
않은 추측은 삭제하거나 사실처럼 바꾸지 않고, `가능성이 크다`, `검증 필요`처럼
짧게 상태를 남긴다.

### Korean register

한국어는 전보체를 기본값으로 삼지 않는다. 간결한 `~다`, `~한다`, `~된다` 등의
완결문을 기본으로 하며, 제목·표·체크리스트·짧은 상태 보고에서만 명사구나
`~함` 체를 허용한다. 이 방식은 토큰을 조금 더 쓸 수 있지만, 문장의 서술 관계와
읽기 흐름을 보존한다.

주어는 선행 대상이 하나이고 화제가 바뀌지 않을 때만 생략한다. 조사도 행위자,
대상, 방향, 위치, 수단, 대조가 동일하게 분명할 때만 생략한다. 인과·조건 연결은
짧게 만들 수 있어도 논리 관계가 드러날 때만 줄인다.

불필요한 완곡 표현, 반복, 상투적 인사말은 제거하되 실제 불확실성은 보존한다.
기술 용어는 정착한 한국어 번역이나 음역을 우선하고, 정착하지 않았으면 원어를
그대로 쓴다. 인용문, 고유명사, 식별자, 경로, 명령어는 원문을 유지한다.

## Benchmarks

## Installation

PowerShell에서 실행:

```powershell
git clone https://github.com/ned-razzz/scrooge-mode.git
cd scrooge-mode
.\scripts\install.ps1
```

기본 설치 경로는 `$CODEX_HOME\skills`이며, `CODEX_HOME`이 없으면 `%USERPROFILE%\.codex\skills`를 사용한다. 설치 후 Codex를 다시 시작한다.

## How to Use

설치 후 대화에서 다음 명령을 사용한다.

- `$scrooge [ko|en]`: 선택한 언어의 압축 규칙을 현재 대화에 적용
- `$scrooge`: 대화 언어에 맞춰 압축 규칙을 자동 선택
- `$scrooge off`: 압축 모드와 언어 고정 해제

활성화 상태는 대화가 끝나거나 `off`로 해제할 때까지 유지된다.
