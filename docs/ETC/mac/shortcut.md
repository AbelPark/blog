---
lang: ko
title: mac 단축키
description: 유용한 단축키 모음
routeMeta:
  tags: [ETC]
  category: 기술
---

# 주요 단축키

## MAC

### 숨김 파일, 폴더 보기

Command + shift + .

## npm

### npm 글로벌 패키지 확인

```sh
npm list -g --depth=0
```

### npm 글로벌 패키지 삭제

```sh
npm uninstall -g {패키지이름}
```

## Vue

### Vue-cli 빌드 후 로컬에서 실행하기

빌드 후

```sh
npm i -g serve # 글로벌 패키지 serve 없다면
serve -s dist
```
