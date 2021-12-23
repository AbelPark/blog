---
lang: ko
title: 커밋 컨벤션
description: 깃 커밋 컨벤션 규칙 소개
---

# GIT commit convention

## 필요성

- 코드 히스토리 파악에 도움이 됨 (협업 중 팀원이 알아보기 용이함)

## 규칙

```text:no-line-numbers
[summary (required)]
type: verb ~

[Description (can be omitted)]
body
footer
```

## summary

### type

- type은 summary에 포함
- commit type은 아래 옵션 중 하나로 구성

| type     | 내용                                                         |
| -------- | ------------------------------------------------------------ |
| feat     | 새로운 기능 추가                                             |
| fix      | 버그 수정                                                    |
| docs     | 문서 수정                                                    |
| style    | 코드 포맷팅, 코드 변경이 없는 경우, 세미콜론 누락            |
| refactor | 코드 리펙토링                                                |
| test     | 테스트 코드, 리펙토링 테스트 코드 추가                       |
| chore    | 빌드 테스크 업데이트, 패키지 매니저, 프로덕션 외의 코드 변경 |
| design   | css, html 변경                                               |

### summary 내용

- 50글자 이내로 작성
- 마침표 찍지 않음, 대문자로 시작
- 첫 단어는 현재 시제 일반동사로 작성함

## description

### body

- 규칙은 따로 없이 추가로 필요한 정보 입력
- 적지 않아도 됨

### footer

- 이슈 추적
- 일반적으로 gihub issue 넘버 입력

## 예시

feat: Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequences of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

- Bullet points are okay, too

- Typically a hyphen or asterisk is used for the bullet, preceded
  by a single space, with blank lines in between, but conventions
  vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123  
See also: #456, #789

> 참고: [유다시티 기술블로그](https://udacity.github.io/git-styleguide/)
