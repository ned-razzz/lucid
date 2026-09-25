<p align="center">
  <img src="assets/logo.svg" width="96" height="96" alt="Lucid logo" />
</p>

<h1 align="center">Lucid</h1>

<p align="center">Agent Skills 호환 코딩 에이전트용 · 쉽고 명확하게 읽히는 응답</p>

<p align="center">
  <a href="https://github.com/ned-razzz/Lucid/stargazers"><img src="https://img.shields.io/github/stars/ned-razzz/Lucid?style=flat&color=yellow" alt="GitHub stars" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/ned-razzz/Lucid?style=flat" alt="MIT license" /></a>
</p>

---

# Overview

Lucid는 AI agent의 응답을 쉽고 빠르게 이해할 수 있도록 가독성과 직관성을 높이는 Agent Skill이다. 필요한 정보는 유지하면서 불필요한 표현을 덜어내고, 내용의 흐름이 한눈에 보이도록 설명을 구성한다.

표준 Agent Skills 형식으로 작성하여 이를 지원하는 코딩 에이전트에서 사용할 수 있다.

한국어와 영어를 지원한다.

Lucid는 [`scrooge-mode`](https://github.com/Kir93/scrooge-mode)를 기반으로 만들었으며, 한국어 출력 규칙은 [`fluent-korean`](https://github.com/snflkd/fluent-korean)의 언어 원칙을 참고해 보완했다.

# Why Use?

AI agent가 코드를 빠르게 생성할수록, 그 결과를 읽고 이해하고 검토하는 일이 더 중요해진다.

Lucid는 응답을 짧게 만드는 데 그치지 않고, 내용을 쉽게 파악할 수 있도록 설명 방식과 글의 구조를 다듬는다.

Lucid는 에이전트의 응답에 다음 원칙을 적용한다.

- 먼저 전체 그림을 보여주고, 핵심 구조와 요소 간의 관계를 설명한 뒤 필요한 세부 정보를 더한다.
- 어려운 개념은 쉬운 말과 구체적인 설명으로 풀어 쓴다.
- 의미와 필요한 정보는 유지하면서 반복과 군더더기를 줄인다.

이를 통해 응답의 요지를 빠르게 파악하고, 세부 내용과 그 근거까지 명확하게 이해할 수 있다.

# Mechanism

Agent Skills 호환 에이전트는 `SKILL.md`의 이름과 설명을 읽고 작업에 맞는
스킬을 선택한다. Lucid가 선택되면 공통 설명 원칙을 적용하고, 응답 언어에 따라
`references/ko.md` 또는 `references/en.md`를 읽는다. 호출 방법과 스킬 설치
경로는 사용하는 에이전트에 따라 달라진다.

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

`skills/lucid` 디렉터리 전체를 사용하는 에이전트의 스킬 디렉터리에 복사한다.
많은 에이전트가 프로젝트의 `.agents/skills/lucid` 또는 사용자 홈의
`~/.agents/skills/lucid`를 인식하지만, 실제 검색 경로와 설치 방법은 에이전트
문서를 확인한다.

# How to Use

코드, 디버깅 결과, 구현 결정 또는 기술 개념을 설명해 달라고 요청하면 에이전트가
Lucid의 설명을 보고 관련성을 판단한다. 명시적으로 사용하고 싶다면 사용하는
에이전트의 스킬 선택 방법을 따른다. 한국어 또는 영어로 답해 달라고 요청하면
해당 언어의 규칙을 적용한다.
