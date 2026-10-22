# 답변 직접 비교하기

`evals/question.md`에 질문과 필요한 자료를 입력한 뒤 저장소 루트에서 실행한다.

```powershell
python -X utf8 evals/benchmark.py
```

Python 3.11 이상과 로그인된 Codex CLI가 필요하다. 같은 질문에 대해
기본 응답·Lucid·한 문장 프롬프트의 답변을 각각 생성하며, 자동 채점은 하지 않는다.
답변은 `evals/results/<실행 시각>/`에 조건별 Markdown 파일 3개로 저장한다.

실제 작업 기록을 바탕으로 구성한 질문 3개는 [questions/](questions/README.md)에 있다.
각각 별도 실행한다.

```powershell
python -X utf8 evals/benchmark.py evals/questions/01-input-sequencing.md
python -X utf8 evals/benchmark.py evals/questions/02-visual-localization.md
python -X utf8 evals/benchmark.py evals/questions/03-offline-iql.md
```

모델은 **`gpt-6-luna`**, 추론 수준은 **`medium`**으로 고정한다. 실행 인자로 모델을
변경하지 않는다. 문서 작성·편집 질문에는 `--documentation`을 붙이고, 다른 질문
파일은 위치 인자로 지정한다. 각 답변은 독립 세션에서 생성하고 도구를 사용한
응답은 오류로 처리한다. Lucid 지침은
입력에 직접 제공하므로, 필요한 코드와 배경은 질문 파일에 함께 넣는다.

실행기 자체의 검사는 모델 호출 없이 실행한다.

```powershell
python -X utf8 -m unittest discover -s tests -p test_benchmark.py -v
```
