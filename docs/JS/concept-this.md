---
lang: ko
title: this
description: this의 개념 이해
routeMeta:
  tags: [JS]
  category: 이론
---

# this

자바스크립트는 스크립트 언어로, interpreter가 코드를 라인 단위로 읽고, 해석 후 실행시킵니다.

> 인터프리터
> 프로그래밍 언어의 소스 코드를 바로 실행하는 컴퓨터 프로그램 또는 환경  
> 원시 코드를 기계어로 번역하는 컴파일러와 대비된다.
>
> - 소스 코드를 직접 실행한다.
> - 소스 코드를 효율적인 다른 중간 코드로 변환하고, 변환한 것을 바로 실행한다
> - 인터프리터 시스템의 일부인 컴파일러가 만든, 미리 컴파일된 저장 코드의 실행을 호출한다.

interpreter에 의해 현재 실행되는 자바스크립트 코드의 (환경 or scope)를 [실행 컨텍스트(execution context)](../JS/execution-context.md) 라고 부릅니다. 자바스크립트 내부에서 이런 실행 컨텍스트를 stack으로 관리하고 있으며 실행되는 시점에 자주 변경되는 실행 컨텍스트를 this가 가리키고 있습니다.

## this바인딩

기본적으로 this는 전역 객체를 가리키게 되는데, Node환경에서는 global객체를, Browser에서는 Window객체를 가리킵니다.

### 함수 내부의 this binding

일반적인 함수 내부에서 this를 호출하면 전역 객체를 가리킵니다.  
만약 함수 내부 or 외부에서 strict 모드를 사용한다면 함수 내부에서 this는 전역객체를 binding 하지 않습니다.

```js
function checkThisInNormalFunc() {
  "use strict"
  console.log(this === window) // false
}
checkThisInNormalFunc()
console.log(this === window) // true
```

### arrow function과 this binding

this는 전역 객체가 아닌 부모 객체인 obj를 가리키기 때문입니다. 이를 lexical this라 한다.

> 참조: [JavaScript this binding 정리](https://medium.com/sjk5766/javascript-this-binding-%EC%A0%95%EB%A6%AC-ae84e2499962)
