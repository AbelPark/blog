---
lang: ko
title: Intro
description: Description of this page
---

## import, require 차이

require는 nodeJS에서 사용되고있는 CommonJS 키워드

import ES2015에서 새롭게 도입된 키워드

script 태그를 사용하는 브라우저 환경과, NodeJS 에서도 CommonJS 를 기본 모듈 시스템으로 채택하고 있기 때문에

Babel과 같은 ES6 코드를 변환(transpile)해주는 도구를 사용할 수 없는 경우에는 require 키워드를 사용해야함

참조: https://hsp0418.tistory.com/147

## setTiemout 삽질기

setTimeout에 await 작동되지 않음...

검색결과...

setTimeout은 Promise반환을 하지 않기 때문에 async와 await를 적용해도 동기적으로 적용되지 않는다고 한다.

따라서 Promise를 반환하게 직접 작성 후 async와 await를 적용해야한다고 한다.

```
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("wait 0.1 sec.")
      const user = {
        id: id,
        name: "User" + id,
        email: id + "@test.com",
      }
      resolve(user)
    }, 100)
  })
}
```

이런식으로
