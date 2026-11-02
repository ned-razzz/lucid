# 답변 직접 비교하기

저장소 루트에서 실행하면 `evals/questions/`의 질문 Markdown 파일을 이름순으로
모두 처리한다. `README.md`는 제외한다.

```powershell
python -X utf8 evals/benchmark.py
```

Python 3.11 이상과 로그인된 Codex CLI가 필요하다. 같은 질문에 대해
기본 응답·Lucid·한 문장 프롬프트의 답변을 각각 생성하며, 자동 채점은 하지 않는다.
답변은 `evals/results/<실행 시각>/<질문 파일명>.md`에 질문마다 하나의 파일로
저장한다. 파일 안에서 기본 응답·Lucid(적용 레벨 표시)·한 문장 프롬프트를 섹션으로
구분한다.

답변 비교용 질문 3개는 [questions/](questions/README.md)에 있다.
하나만 실행하려면 질문 파일을 지정한다.

```powershell
python -X utf8 evals/benchmark.py evals/questions/01-aws-login-session.md
python -X utf8 evals/benchmark.py evals/questions/02-ros2-qos.md
python -X utf8 evals/benchmark.py evals/questions/03-ai-data-split.md
```

모델은 **`gpt-6-luna`**, 추론 수준은 **`medium`**으로 고정한다. 실행 인자로 모델을
변경하지 않는다. 문서 작성·편집 질문에는 `--documentation`을 붙인다. 직접 작성한
질문 파일도 위치 인자로 지정할 수 있다. 개별 질문을 지정해도 같은 경로 규칙으로
저장한다. 실행 중 오류가 나면 해당 파일에는 그때까지 완료된 답변이 남는다.
각 답변은 독립 세션에서 생성하고 도구를 사용한
응답은 오류로 처리한다. Lucid 지침은
입력에 직접 제공하므로, 필요한 코드와 배경은 질문 파일에 함께 넣는다.

실행기 자체의 검사는 모델 호출 없이 실행한다.

```powershell
python -X utf8 -m unittest discover -s tests -p test_benchmark.py -v
```
