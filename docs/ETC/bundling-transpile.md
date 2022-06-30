---
lang: ko
title: Bundling & Transpile
description: 번들링과 트랜스파일 이해
routeMeta:
  tags: [ETC]
  category: 이론
---

# Bundling & Transpile

번들링과 트렌스파일은 독립적인 주제이기는 하나 대부분 **빌드 툴 체인(Build Tool Chain)**<sup id="a1">[[1]](#footnote01)</sup>이라는 큰 주제에 같이 묶여서 사용됨.

::: tip
**Complie vs Transpile**  
Complie이란 작성된 코드를 기계가 이해 할 수 있는 바이너리 코드로 바꾸는 것  
Transpile이란 언어 대 언어로 변형하는 작업

- Complie: 언어 => 기계
- Transpile: 언어 => 언어
  :::

## 번들링(Bundling)

> 번들러 [webpack](https://webpack.js.org/), [rollup](https://rollupjs.org/guide/en/)  
> 일반적으로 프론트엔드는 Webpack, 백엔드나 모듈 라이브러리는 Rollup을 사용한다.

번들링이란 기본적으로 여러 개로 흩어져 있는 파일들을 압축, 난독화 등을 하여 하나의 파일로 모아주는 것.  
주로 JavaScript에 사용되고, 플러그인 등을 통해 HTML, CSS, 심지어 이미지까지 압축하거나 최적화를 하기도 함.

### 용도

프로젝트가 커져감에 따라 JavaScript 파일들을 여러 개로 나누어 관리하게 되었고, 웹에서 파일을 다운받을 때 여러 개로 나누어서 다운받는 속도보다 하나로 뭉쳐서 다운받는 것이 훨씬 빠르기 때문에, 작업할 때는 여러 개로 나누어서 작업하고 최종적으로 웹서버에 올릴 때는 하나의 파일로 압축하여 올리게 된 것.

이후 여러 가지 플러그인들이나 기능들이 더해져서 파일만 합치는 작업뿐만 아니라, CSS Preprocessing과 이미지 최적화 등 다양한 용도로 쓰이게 되었다.

## 트랜스파일(Transpile)

> 트렌스파일러 [Babel](https://babeljs.io/)

트렌스파일이란 언어 대 언어로 최신 문법을 레거시 문법으로 다시 써주어 구형 디바이스나 브라우저에서도 작동을 할 수 있게끔 해주는 것.

### 용도

새로운 문법이 나왔는데 아직 벤더(Vendor)들이 해당 기능을 다 구현하지 못한 경우, 코딩은 신규 문법으로 작성하고 Transpile한 결과는 예전 문법으로 작성해주는 방식.  
JavaScript와 같이 표준을 만드는 집단(ECMA International)과 해당 기능을 제공하는 Vendor들(브라우저 제작사: Chrome/Google, Safari/Apple, Firefox/Mozilla, IE/Microsfot등)이 다분화되어 있는 경우, 표준과 Vendor들의 지원 현황이 속도가 맞지 않아서 자주 사용되는 기법이다.  
Less, Sass, Stylus > CSS 로 변환하는 것도 Transpile의 일종.

---

<a name="footnote01">1.</a> 빌드 툴 체인이란 소스를 빌드하는 과정 전반에 걸처 필요한 도구들로써 Bundling 및 Complie 또는 Transpile, Profile, Coverage, Testing 등 상당히 넓은 영역을 가지고 있다. [↩](#a1)

> 참조 [위펄슨 기술 블로그](https://tech.weperson.com/wedev/frontend/bundling-transpiler/#%E1%84%87%E1%85%A5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A5-bundler),
