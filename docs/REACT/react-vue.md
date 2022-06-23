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

## 2. props

::: tip
vue는 파일 자체에 템플릿과 스크립트를 구성하여 파일 하나당 한가지의 컴포넌트를 구성하는 방식이 권장된다.  
react는 함수에 태그를 리턴하여 컴포넌트를 구성하는 방식이 권장된다. 한가지 파일에 여러개의 컴포넌트를 구성할 수 있다.
:::

컴포넌트 태그에 속성값 내려받기(함수 또한 전달할 수 있다.)

부모창

:::: code-group
::: code-group-item Vue

```vue
<!-- vue는 파스칼케이스 객체 식별자가 태그명으로 설정될 때
자동적으로 케밥케이스 형식도 가능하도록 설정됨. -->
<!-- 물론 파스칼케이스 그대로 사용해도됨 -->

<!-- app.vue -->
<template>
  <my-compo title="vue" />
</template>

<script lang="ts">
import MyCompo from "../MyCompo.vue"

export default defineComponent({
  components: {
    MyCompo,
  },
})
</script>

<!-- MyCompo.vue -->
<template>
  <h1>{{ title }}</h1>
</template>

<script lang="ts">
import MyCompo from "../MyCompo.vue"

export default defineComponent({
  props: {
    title: {
      type: string
      default: ""
    }
  },
  setup(props) {
    const title = props.title
    return  {
      title
    }
  }
})
</script>
```

:::

::: code-group-item React

```tsx
// App.tsx
import { MyHeader } from "./views/MyHeader"

const App = () => {
  return (
    <div className="App">
      <MyHeader title="react" />
    </div>
  )
}

// MyHeader.tsx
export const MyHeader = props => {
  console.log(props) // object title:react
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  )
}
```

:::
::::

## 3. useState

상태관리 함수이다. vue3에서 ref, reactive와 동일한 동작을 한다.

```tsx
import { useState } from "react"

const _mode = useState("welcome")
console.log(_mode) // ["welcome", fuction]
// 배열의 0번은 상태값 1번은 상태값 변환 함수이다.

export const MyHeader = props => {
  // 그래서 useState 훅 선언시 일반적으로
  const [mode, setMode] = useState("welcome")
  console.log(mode) // welcome
  return (
    <div>
      {props.topics.map((item, index) => {
        return (
          <ul key={index}>
            <li
              id={item.id}
              onClick={e => {
                e.preventDefault()
                props.onChangeMode(e.target.id)
              }}
            >
              {item.title} {index}
            </li>
            <p onClick={() => setMode(item.body)}>{item.body}</p>
          </ul>
        )
      })}
    </div>
  )
}
```

## 3. 라우터

react-router-dom 라이브러리를 사용하여 관리합니다.  
앱에서 발생하는 라우팅이 location나 history와 같은 브라우저 내장 API와 연동됩니다.

### 핵심 함수

- useNavigate

동일 출처(URL)에서 path(또는 query string, fregment)를 이동시키는 훅 입니다.  
vue의 router push와 유사한 기능을 구현합니다.

```tsx
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"

export const RQExample = () => {
  const navigate = useNavigate()
  const GoPath = (idx: number) => navigate(`/healthdetail/${idx}`) // 라우터 경로
  const { data, isLoading } = useQuery("example", fetchAPi, {
    staleTime: 5000,
  })
  if (isLoading) {
    return <h1>Loading</h1>
  }
  return (
    <>
      <h2>Example</h2>
      {data?.data.Body.map(({ Title }: any, idx: number) => (
        <div key={idx} onClick={() => GoPath(idx)}>
          {Title}
        </div>
      ))}
    </>
  )
}
```

::: tip
react 컴포넌트 내부에서 동작하는 라이브러리 함수들은 React 컴포넌트가 되는 조건에서만 동작합니다.
그 외에도 Link 태그를 이용하는 방법이 있습니다.
:::

```tsx
return (
  <>
    <h2>Example</h2>
    {data?.data.Body.map(({ Title }: any, idx: number) => (
      <Link key={idx} to="/healthdetail">
        <div>{Title}</div>
      </Link>
    ))}
  </>
)
```

- useParams

url의 parameter 객체를 리턴하는 훅입니다.  
vue의 `const { params } = useRoute()` 와 동일한 값을 리턴합니다.

```tsx
import { useParams } from "react-router-dom"

export const Healthdetail = () => {
  const idx = useParams()
  console.log(idx) // {idx:0}
}
```

## 5. [react-query](/docs/REACT/react-query.md)

## 6. [recoil](/docs/REACT/react-recoil.md)
