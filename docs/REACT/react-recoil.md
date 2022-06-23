---
lang: ko
title: Recoil
description: Recoil
routeMeta:
  tags: [react]
  category: 기술
---

# Recoil

## Recoil 이란?

React를 위한 전역 상태관리 라이브러리로 vue의 vuex와 유사한 기능을 수행합니다.

## atom

상태(state)의 일부를 나타냅니다. Atoms는 어떤 컴포넌트에서나 읽고 쓸 수 있습니다.  
atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독합니다.  
따라서 atom에 어떤 변화가 있으면 그 atom을 구독하는 모든 컴포넌트들이 재 렌더링 되는 결과가 발생합니다.

```tsx
import { atom } from "recoil"

const global = atom<any>({
  key: "global", // unique ID (with respect to other atoms/selectors)
  default: "안녕하세요!",
})
```

## useSetRecoilState

react 내부 기능은 useState를 전역적으로 사용하는 것으로 평가할 수 있습니다.

```tsx
import { atom, useRecoilState } from "recoil"

const global = atom<any>({
  key: "global",
  default: "안녕하세요!",
})

const MyHeader = (props: any) => {
  return (
    <>
      <h1>{props.Title}</h1>
    </>
  )
}

const InputBox = () => {
  const [globalState, setGlobalState] = useRecoilState(global)
  return (
    <>
      <input type="text" value={globalState} onChange={e => setGlobalState(e.target.value)} />
    </>
  )
}

export const RCMain = () => {
  const globalState = useRecoilState(global)
  return (
    <>
      <MyHeader Title={globalState} />
      <InputBox />
    </>
  )
}
```

## 평가

vue의 전역상태 관리 툴인 vuex와 큰 차이가 없어 보입니다.  
따라서 컴포넌트별 분리시 유용하게 사용할 수 있을 것으로 보입니다.  
react-query는 네트워크 데이터 위주로, recoil은 클라이언트 데이터를 다루면 효과적으로 상태관리를 할 수 있을 것으로 보입니다.
