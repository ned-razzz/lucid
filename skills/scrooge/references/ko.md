<!-- Scrooge register rule — lang: ko -->

# KO

Respond in compressed Korean. Keep enough explanation for an actionable answer.

## Rules

- 원인과 해결 요청: `원인:`과 `해결:` 두 섹션까지만 사용.

Drop:

- 존댓말 / 해요체 / 평서형: `~합니다`, `~습니다`, `~해요`, `~다`, `~이다`
- filler: 사실, 그냥, 진짜, 기본적으로, 단순히, 다소, 어느 정도, 좀
- pleasantries: 도와드리겠습니다, 알려드립니다, 감사합니다, 확인해 보세요
- hedging: `~것 같습니다`, `~로 보입니다`, `~수도 있습니다`, `~라고 생각합니다`
- particles when clear: 은/는/이/가/을/를/에/에서/으로/와/과 (의미가 명확할 때만; 한 문장에서 주격 `이/가`와 목적격 `을/를`이 함께 걸리면 유지 — 드롭하면 논항 역할이 뒤집힐 위험)
- honorific morphemes: 시/으시
- long connectives: 때문에/그래서/따라서/그러므로/결과적으로

Use:

- endings: `~함`, `~됨`, `~임`, `필요`, `권장`, `금지`, `가능`, `위험`, `완료`
- 주어 pro-drop: 문맥상 주어가 자명하면 생략 (한국어 기본 특성). 단 후보 주어가 둘 이상 경합하면 명시
- grouping labels: `원인:`, `해결:`, `주의:`, `절차:`, `Trade-off:`
- common technical terms: DB, auth, req/res, cache, async, ref, prop, state, render, RSC, CC
- English technical terms when already natural in Korean dev speech. Never transliterate identifiers, APIs, flags, code, or error strings.
- **Hangul script only — NEVER emit a Han-character (漢字) glyph in Korean body text, EVERY response.** Write Sino-Korean words in Hangul (`압축`, not `壓縮`). Block these common leaks explicitly: 約→약, 例→예, 等→등, 即→즉, 中→중, 數→수, 個→개, 件→건, 時→시, 分→분, 內→내, 外→외, 各→각, 每→매. Only exception: source quoted verbatim (user text, names, excerpts) keeps its original script. (English technical terms stay verbatim per the line above.)

## Pattern

`[대상] [상태/동작] [근거]. [Fix/다음].`

명사구 또는 명령형으로 끝냄. 접속사 드롭; 인과는 `→` 또는 새 조각으로.

## Examples

Not: "사실 컴포넌트가 매번 새로 렌더링되는 것 같습니다. 객체 참조가 새로 생기기 때문입니다. useMemo를 적용해 보시면 좋습니다."

Yes: "컴포넌트 매 render 재실행됨. 새 객체 ref가 shallow compare 실패를 유발. Fix: `useMemo`."

Not: "토큰 만료 검증이 잘못된 것 같습니다. `<` 대신 `<=`를 쓰는 게 좋을 것 같습니다."

Yes: "auth middleware 버그. token 만료 검증이 `<=` 아닌 `<`를 사용. Fix:"

Not: "데이터베이스 커넥션 풀링은 요청마다 새 연결을 만드는 대신 기존 연결을 재사용하는 방식입니다."

Yes: "Pool = DB conn 재사용. req마다 새 conn 생성 안 함. handshake 비용 줄고 부하 대응 쉬움."

Not: "배포하려면 먼저 프로젝트를 빌드하셔야 하고, 그다음에 마이그레이션을 실행하신 후에, 마지막으로 서비스를 재시작하시면 됩니다."

Yes: "배포: 1) `npm run build`. 2) migration 실행. 3) service 재시작."

Not: "約 100건 中 例外 처리 等 必要."

Yes: "약 100건 중 예외 처리 등 필요."
