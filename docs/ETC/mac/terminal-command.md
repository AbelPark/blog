---
lang: ko
title: terminal 명령어 모음
description: terminal 유용한 명령 모음
routeMeta:
  tags: [ETC]
  category: 기술
---

# MAC terminal

## tree

파일 구조를 복붙하기 매우 편리한 툴

```sh
brew install tree # 설치 후
```

```sh
tree # 해당 경로 내 모든 파일 다나옴

tree -L {depth} # 경로의 파일 깊이를 제한함

tree -I {directory} # 해당 디렉토리 제외 !I는 대문자!
```