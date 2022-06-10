---
lang: ko
title: vuex란?
description: Description of this page
---

# Vuex

## vuex란

vue의 전역 상태관리 라이브러리다.

### vuex 모듈간 state 호출

```js
// store index
export default createStore({
  modules: {
    common,
    cert,
  },
})

// common
export const common = {
  state: {
    bar: "hello",
  },
}

// cert
export const cert = {
  actions: {
    foo({ rootState }) {
      console.log(rootState.common.bar) // hello
    },
  },
}
```
