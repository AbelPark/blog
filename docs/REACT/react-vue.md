---
lang: ko
title: react vs vue
description: react & vue 비교
routeMeta:
  tags: [react]
  category: 기술
---

# React

## 1. 구성

CRA 프로젝트 구조

```sh
npx create-react-app {my-app} --typescript
```

```
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html # SPA 메인 html 페이지
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json # SON 텍스트 파일에 웹 애플리케이션에 대한 정보를 제공(기능적 수행은 잘 모름)
│   └── robots.txt # SEO 설정
├── src
│   ├── App.css
│   ├── App.test.tsx # 테스트 파일
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts # create-react-app으로 시작된 프로젝트와 관련된 TypeScript 타입 선언을 참조. 그리고 이러한 타입 선언은 bmp, gif, jpg, jpg, png, webp 및 svg와 같은 리소스 파일을 가져오는데 대한 지원을 추가함.
│   ├── reportWebVitals.ts # 성능 분석 리포트
│   └── setupTests.ts # React 프로젝트에서 테스트를 실행하기 위한 설정 파일
└── tsconfig.json
```

## 2. 문법상 차이

:::: code-group
::: code-group-item Vue

```vue
<template>
  <div>Vue.js</div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {},
})
</script>

<style></style>
```

:::

::: code-group-item React

```js
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// App.tsx
const App = () => {
  return (
    <div className="App">react</div>
  )
}
```

:::
::::

vue는 파일 자체에 템플릿과 스크립트를 구성하여 파일 하나당 한가지의 컴포넌트를 구성하는 방식이 권장된다.
react는 함수에 태그를 리턴하여 컴포넌트를 구성하는 방식이 권장된다. 한가지 파일에 여러개의 컴포넌트를 구성할 수 있다.

## 3. 핵심 기능 문법(watch, compute)

## 4. 모듈화

## 5. 전역 상태관리

## 6. react 쿼리

## 7. recoil

> 참조: [블로그](https://velog.io/@ordidxzero/cra-project-structure)
