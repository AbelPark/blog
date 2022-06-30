---
lang: ko
title: vuex api 분기 처리
description: vuex api 분기
routeMeta:
  tags: [vue]
  category: 기술
---

# Vuex로 여러 API 효과적으로 분기 처리했던 기록

## 상황

- 같은 페이지를 여러 제휴사 앱내에 웹뷰를 제공해야하는 상황.
- 앱에서 새롭게 브라우저를 띄우는 경우, back button 기능을 정의 해줘야하는 경우 등등... 제휴사 제공 스크립트를 받아 앱에 API를 호출해야했다.
- 제휴사별로 호출 API가 각기 달라서 클릭 이벤트 동작에 분기처리가 필요했다.

## 해결방법

vuex module을 추가하여 해당 제휴사 코드인 경우 스크립트를 호출, 클릭 이벤트를 동적으로 분기처리했다.

## 처리 과정

- 채널값은 url parameter로 들어온다.

```sh
vuex 디렉토리 구성

│   ├── store
│   │   ├── index.ts
│   │   └── modules
│   │       ├── app.ts
│   │       ├── common.ts
│   │       ├── channel1.ts
│   │       └── channel2.ts
```

```json
// 고정값을 모아놓은 json 파일이다.
// 키는 요청 API경로를 값을 채널값을 모아놓은 배열로 만들었다.
  "channel": {
    "channel1": ["channel1_1", "channel1_2","channel1_3"],
    "channel2": ["channel2_1", "channel2_2","channel2_3"]
  }

```

```ts
interface apiModuleType {
  channel1: String[]
  channel2: String[]
}

// json 파일의 배열 내에 해당 채널이 속한 키값을 리턴해준다.
// 없으면 기본값 common을 리턴한다.
export const channelChecker = (channel: string) => {
  for (const key in constant.channel) {
    if (constant.channel[key as keyof apiModuleType].indexOf(channel) !== -1) return key
  }
  return "common"
}
```

```ts
// app.ts
export interface AppState {
  apiModule: string
  channel: string
}

export const app: Module<AppState, RootState> = {
  namespaced: true,
  state: {
    apiModule: "common",
    channel: "mychannel",
  },
  mutations: {
    SET_API_MODULE(state, payload) {
      state.apiModule = payload
    },
  },
}
```

```ts
// 모듈마다 같은 action 함수에 서로 다른 로직을 실행한다.

// common.ts
export const common: Module<CommonState, RootState> = {
  namespaced: true,
  actions: {
    openBrowser({ rootState }) {
      window.open(`https://myurl/page/${rootState.app.channel}`, "_blank")
    },
  },
}

// channe1.ts
export const channe1: Module<Channe1State, RootState> = {
  namespaced: true,
  actions: {
    openBrowser({ rootState }) {
      channe1API.callBrowser(`https://myurl/page/${rootState.app.channel}`)
    },
  },
}

// channe2.ts
export const channe1: Module<Channe2State, RootState> = {
  namespaced: true,
  actions: {
    openBrowser({ rootState }) {
      channe2API.executeBrowser(`https://myurl/page/${rootState.app.channel}`)
    },
  },
}
```

```vue
<template>
  <img @click="openBrowser" src="@/이미지.jpg" />
</template>

<script>
export default defineComponent({
  setup() {
    const { state, commit, dispatch } = useStore()
    // 키값을 넣고
    store.commit("app/SET_API_MODULE", channelChecker(channel))
    // 키값에 해당하는 모듈의 vuex 액션 호출한다.
    const openBrowser = () => {
      dispatch(`${state.app.apiModule}/openBrowser`)
    }
    return {
      openBrowser,
    }
  },
})
</script>
```

vuex 모듈 경로와 json 채널 키값을 일치시켜 키value에 일치하는 채널에서 접근 할 시,
키값과 일치하는 vuex 모듈 action을 수행시켰다.  
api가 추가되면 vuex 모듈을 추가하고, 모듈과 일치하는 값을 키를 json에 추가해주면 제휴사마다 별도의 api를 호출 할 수 있다. (단, vuex 액션의 함수명은 모든 모듈에서 일치해야한다!)

## 후기

한 페이지에 여러 제휴사 api를 붙이면 항상 분기처리가 골치 아팟는데, 나름 괜찮은 방식의 분기처리 방식을 고안 해 낸 것 같아서 뿌듯하다.  
같은 제휴사 채널이 늘어나면 json value에 추가 하면되고, 제휴사가 추가되면 vuex module을 추가해주면 되는 방식.  
관리적인 측면에서 나쁘지 않은 것 같다.
