---
lang: ko
title: React-Query
description: React Query
routeMeta:
  tags: [react]
  category: 기술
---

# React Query

## 리엑트 쿼리란?

React Query는 데이터 Fetching, 캐싱, 동기화, 서버 쪽 데이터 업데이트 등을 쉽게 만들어 주는 React 라이브러리입니다.

기존에 Redux, Mobx, Recoil과 같은 상태 관리 라이브러리들이 있긴 하지만, 클라이언트 쪽의 데이터들을 관리하기에 적합할 순 있어도 서버 쪽의 데이터들을 관리하기에는 적합하지 않은 점들이 있어서 등장하게 되었습니다.

예를 들어, 관리자 화면에서 동시에 두 명의 관리자가 같은 페이지를 바라보고 있는 상황에서 한 관리자가 유저의 데이터를 변경하면, 다른 관리자도 그 유저의 변경된 데이터를 바라볼 수 있어야 합니다. 이러한 유저의 데이터는 클라이언트 쪽보다는 서버 쪽에 좀 더 적합하다고 볼 수 있습니다.

## useQuery

useQuery 훅은 promise로 반환된 객체를 내부 옵션을 통해 컨트롤 할 수 있는 유용한 기능을 제공합니다.

```js
import { useQuery } from "react-query"
// 주로 사용되는 3가지 return 값 외에도 더 많은 return 값들이 있다.
const { data, isLoading, error } = useQuery(QueryKey, Query Functions, Query Options)
```

### QueryKey

- queryKey 기반으로 데이터 개싱을 관리합니다.
- 문자열 또는 배열로 지정할 수 있다.

```js
// 문자열
useQuery('todos', ...)
// 배열
useQuery(['todos'], ...)
```

- 쿼리가 변수에 의존하는 경우에는 QueryKey 에도 해당 변수를 추가해주어야 합니다.

```js
const { data, isLoading, error } = useQuery(["todos", id], () => axios.get(`http://.../${id}`))
```

### Query Functions

- useQuery 의 두번째 인자에는 promise 를 반환하는 함수를 넣어줘야 합니다.

```ts
const fetchAPi = () => {
  return axios.post("serverURL", httpData)
}
useQuery("todos", fetchAPi)
```

### Query Options

공식문서에 많은 옵션이 소개가 되어있지만 주로 쓰고, 유용해 보이는 것들만 골라 보았습니다.

### - enabled(boolean)

쿼리가 자동으로 실행되지 않게 설정하는 옵션입니다.

```ts
// id 값이 존재하는 경우에만 쿼리 요청
const { data } = useQuery(["todos", id], () => axios.get(`http://.../${id}`), {
  enabled: !!id,
})
```

### - retry(boolean | number | (failureCount: number, error: TError) => boolean)

실패한 쿼리를 재시도하는 옵션입니다.  
true 로 설정하면 쿼리 실패시 무한 재시도하고 false로 설정하면 재시도를 하지 않습니다.
default: 3

### - staleTime(number | Infinity)

fresh 상태로 유지되는 시간이다. 해당 시간이 지나면 stale 상태가 됩니다.  
fresh 상태는 서버로부터 최신의 데이터를 받아온 상태를 뜻하고, stale은 서버와 캐시데이터의 값이 다를 수 있는 refetching 필요한 상태를 뜻합니다.  
fresh 상태에서는 쿼리가 다시 mount 되어도 fetch가 실행되지 않습니다.
default: 0

### - cacheTime(number | Infinity)

inactive 상태인 캐시 데이터가 메모리에 남아있는 시간입니다. 이 시간이 지나면 캐시 데이터는 가비지 컬렉터에 의해 메모리에서 제거됩니다.
default: 5분

### - refetchOnMount(boolean | "always")

데이터가 stale 상태일 경우 마운트 시 마다 refetch를 실행하는 옵션 입니다.
always로 설정하면 마운트 시 마다 매번 refetch 를 실행합니다.
default: true

### - refetchOnWindowFocus(boolean | "always")

데이터가 stale 상태일 경우 윈도우 포커싱 될 때 마다 refetch를 실행하는 옵션입니다.  
예를 들어, 크롬에서 다른 탭을 눌렀다가 다시 원래 보던 중인 탭을 눌렀을 때도 이 경우에 합니다. F12로 개발자 도구 창을 켜서 네트워크 탭이든, 콘솔 탭이든 개발자 도구 창에서 페이지 내부를 다시 클릭했을 때도 이 경우에 해당됩니다.
default: true
always로 설정하면 항상 윈도우 포커싱 될 때 마다 refetch를 실행합니다.

### - onSuccess((data: TDdata) => void)

매개변수 data는 성공 시 리턴받는 객체입니다.

### - onError((error: TError) => void)

onSuccess 는 쿼리 성공 시 실행되는 합수입니다.
onError 는 쿼리 실패 시 실행되는 함수입니다.
매개변수로 에러 값을 받을 수 있습니다.

```tsx
import axios from "axios"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"

export function guid() {
  function _p8(s: boolean) {
    const p = (Math.random().toString(16) + "000000000").substr(2, 8)
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p
  }
  return _p8(false) + _p8(true) + _p8(true) + _p8(false)
}

const httpData = {
  Header: {
    CmdType: 10020,
    RequestID: guid(),
  },
  Body: { Length: 5, Offset: 0 },
}

const fetchAPi = () => {
  return axios.post("https://dev-wcrs.familycare.ai:1023/service", httpData, { withCredentials: true })
}

export const RQExample = () => {
  const navigate = useNavigate()
  const GoPath = (idx: number) => navigate(`/healthdetail/${idx}`)
  const { data, isLoading, error } = useQuery("example", fetchAPi, {
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


## 장점

직접 만들어서 사용했던 기타 기능들을 옵션으로 지원하여, 캐시 처리를 기존보다 간단하게 사용할 수 있었습니다. 따라서, 프로젝트 구조가 기존보다 단순화 시킬 수 있을것으로 생각하고, 서버에 중복 데이터 호출을 줄이므로써 최적화 측면에서도 큰 장점이 있을 것으로 판단됩니다.
