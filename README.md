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

## Demo

## Why Use?

AI agent 덕분에 코드 생성은 더 이상 소프트웨어 개발의 병목이 아니다. 이제 핵심 병목은 생성된 코드와 구현 내용을 읽고 이해하는 일이다.

Scrooge Skills는 내용을 생략하지 않으면서 출력을 최대한 압축해 가독성과 내용 이해 속도를 높인다. 필요한 정보는 유지하고 불필요한 표현만 줄여, 응답을 빠르게 파악하고 다음 작업으로 넘어갈 수 있게 한다.

출력 토큰량이 줄어드는 것도 이점이다. 일반적으로 출력 토큰이 가장 비싸므로 응답을 짧게 만들어 비용을 아낄 수 있다. 다만 스킬을 읽고 적용하는 데 입력 토큰이 추가되므로, 실제 절약 효과는 대화와 사용 상황에 따라 달라질 수 있다.

## Mechanism

- `$scrooge [ko|en]`: 선택한 언어의 압축 규칙을 현재 대화에 적용
- `$scrooge`: 대화 언어에 맞춰 압축 규칙을 자동 선택
- `$scrooge off`: 압축 모드와 언어 고정 해제

활성화 상태는 대화가 끝나거나 `off`로 해제할 때까지 유지된다. 선택된 언어의 reference만 불러오며 hooks, 별도 runtime, 백그라운드 프로세스는 사용하지 않는다.

## Benchmarks

## Installation

PowerShell에서 실행:

```powershell
git clone https://github.com/ned-razzz/scrooge-mode.git
cd scrooge-mode
.\scripts\install.ps1
```

기본 설치 경로는 `$CODEX_HOME\skills`이며, `CODEX_HOME`이 없으면 `%USERPROFILE%\.codex\skills`를 사용한다. 설치 후 Codex를 다시 시작한다.
