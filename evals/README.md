# 답변 직접 비교하기

`evals/question.md`에 질문과 필요한 자료를 입력한 뒤 저장소 루트에서 실행한다.

```powershell
python -X utf8 evals/benchmark.py
```

Python 3.11 이상과 로그인된 Codex CLI가 필요하다. 같은 질문에 대해
기본 응답·Lucid·한 문장 프롬프트의 답변을 각각 생성하며, 자동 채점은 하지 않는다.
답변과 실행 정보는 `evals/results/<실행 시각>/`에 저장한다.

모델은 **`gpt-6-luna`**, 추론 수준은 **`medium`**으로 고정한다. 실행 인자로 모델을
변경하지 않는다. 문서 작성·편집 질문에는 `--documentation`을 붙이고, 다른 질문
파일은 위치 인자로 지정한다. 각 답변은 독립 세션에서 생성하고 도구를 사용한
응답은 저장된 로그에서 확인하도록 오류로 처리한다. Lucid 지침은
입력에 직접 제공하므로, 필요한 코드와 배경은 질문 파일에 함께 넣는다.

실행기 자체의 검사는 모델 호출 없이 실행한다.

```powershell
python -X utf8 -m unittest discover -s tests -p test_benchmark.py -v
```
