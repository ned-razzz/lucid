<!-- Lucid register rule — lang: ko -->

# KO

## Rules

- Default to complete sentences with declarative endings such as `~다`, `~한다`, `~된다`, and `~이다`.
- Drop the subject only when one antecedent is certain and the topic has not changed.
- Drop a particle only when agent, object, direction, location, means, and contrast remain equally clear.

Remove when they add no meaning:

- filler, such as `사실`, `그냥`, `진짜`, `기본적으로`, `단순히`, `다소`, `어느 정도`, and `좀`
- pleasantries, such as `도와드리겠습니다`, `알려드립니다`, `감사합니다`, and `확인해 보세요`

Use:

- Prefer established Korean translations or transliterations for technical terms; otherwise keep the original term.
- Write ordinary Sino-Korean words in Hangul; retain the spelling of proper names and technical identifiers.

## Examples

### Unfamiliar concept

Assume the reader is new to connection pooling. Compare whether the explanation makes sense without prior knowledge, rather than judging its length.

Wordy: "데이터베이스에 연결할 때는 기본적으로 통신을 설정하고 인증하는 과정이 필요한데요. 연결 풀이라는 것은 사용 가능한 연결을 보관했다가 요청에 빌려주고 사용이 끝나면 돌려받아 다시 사용하는 방식이라고 할 수 있습니다. 이를 통해 요청마다 새 연결을 만드는 작업을 줄일 수 있습니다."

Too compressed: "DB 연결 풀은 연결을 재사용해 연결 비용을 줄인다."

Clear: "애플리케이션이 DB에 새로 연결할 때는 통신을 설정하고 인증하는 과정이 필요하다. 연결 풀은 사용 가능한 연결을 보관했다가 요청에 빌려주고, 사용이 끝나면 돌려받아 다시 사용한다. 그래서 요청마다 새 연결을 만드는 작업을 줄일 수 있다."

The compressed version leaves the reader to infer what the pool does and which work it avoids. The clear version supplies those links while removing empty phrasing.
