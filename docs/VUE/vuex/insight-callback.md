---
lang: ko
title: action 비동기 + 콜백 설정
description: 비동기 방식과 콜백이 동시 사용이 필요한 경우
routeMeta:
  tags: [vue]
  category: 기술
---

# action 비동기 + 콜백 설정

## 상황

연동 API를 CDN으로 받아 해당 네이티브 앱의 메소드를 호출해야 하는 상황

## 조건

url parameter가 해당될 때에만 CDN 다운로드는 받고, 연동 API 메소드를 설정해줘야함

## 시행착오

```ts
// layout.vue
// 조건만족시 CDN 다운로드
if(조건) {
  const appApi = document.createElement("script")
  appApi.src = {CDN 주소}
  document.getElementsByTagName("head")[0].appendChild(appApi)
}

// vuex action
// 최대 3차례 재귀를 실행하여 window[api객체명]을 state에 저장한다.(CDN 다운로드를 기다림)
// 다운로드가 완료되지 않으면 window[api객체명]이 undefined 가 된다.
callAppApi({ state, commit, dispatch }, payload: ConnectAppApi) {
  // @ts-ignore
  commit("SET_APP_API", window[payload.api])
  if (state.appApi === null || state.appApi === undefined) {
    console.log(`${payload.attemp + 1}번 오류남`)
    if (payload.attemp < 3) {
      setTimeout(() => {
        payload.attemp++
        dispatch("callAppApi", { attemp: payload.attemp, api: payload.api})
        // 암묵적 return
      }, 500)
    } else {
      alert("APP API is not found")
    }
  } else {
    console.log("잘됨")
    return true
  }
}
```

```ts
// page.vue
// 비동기 함수가 재귀함수로 여러차례 실행된 후,
// isReady를 true로 리턴받으면 앱 호출 메소드를 설정할 수 있을것이라 생각함
onMounted(async () => {
  if (조건) {
    const isReady = await dispatch("store/callAppApi", { attemp: 0, api: "API명" })
    // isReady === undefined
    if (isReady) {
      dispatch("api/setBasic")
      dispatch("api/setBackBtn")
    }
  }
})
```

하지만 promise callback은 함수가 한차례 실행되면 암묵적 리턴이 실행된다.  
재귀를 하더라도 해당 재귀함수가 끝나는 시점에 비동기 함수가 완료되는것이 아니라,  
함수가 한 사이클 실행되었을때 암묵적으로 리턴이 되어 isReady에는 어떠한 값도 할당되지 않는다.

그래서 callback 함수를 담아 실행했다

```ts
// vuex action
callAppApi({ state, commit, dispatch }, payload: ConnectAppApi) {
  // @ts-ignore
  commit("SET_APP_API", window[payload.api])
  if (state.appApi === null || state.appApi === undefined) {
    console.log(`${payload.attemp + 1}번 오류남`)
    if (payload.attemp < 3) {
      setTimeout(() => {
        payload.attemp++
        dispatch("callAppApi", { attemp: payload.attemp, api: payload.api, callback: payload.callback }) // 콜백함수까지 객체에 담아서 전달
      }, 500)
    } else {
      alert("APP API is not found")
    }
  } else {
    console.log("잘됨")
    payload.callback()
  }
},

// page.vue
onMounted(() => {
  if (조건) {
    dispatch("page/callAppApi", { attemp: 0, api: "api명", callback: callback })
  }
})
```
