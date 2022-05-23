---
lang: ko
title: Hoisting
description: 호이스팅 이해하기
routeMeta:
  tags: [JS]
  category: 이론
---

# Hoisting

> 자바스크립트는 ES6에서 도입된 let, const를 포함하여 모든 선언(var, let, const, function, function\*, class)을 호이스팅한다. 호이스팅(Hoisting)이란, var 선언문이나 function 선언문 등을 해당 스코프(유효범위)의 선두로 옮긴 것처럼 동작하는 특성을 말한다

**var 키워드로 선언된 변수와는 달리 let 키워드로 선언된 변수를 선언문 이전에 참조하면 참조 에러(ReferenceError)가 발생**한다.  
let 키워드로 선언된 변수는 스코프의 시작에서 변수의 선언까지 **일시적 사각지대(Temporal Dead Zone; TDZ)**에 빠지기 때문이다.

변수가 어떻게 생성되며 호이스팅은 어떻게 이루어지는지 좀 더 자세히 살펴보자. 변수는 3단계에 걸쳐 생성된다. 자세한 내용은 [Execution Context](../JS/execution-context.md)을 참조하기 바란다.

1. 선언 단계(Declaration phase)  
   변수를 실행 컨텍스트의 변수 객체(Variable Object)에 등록한다. 이 변수 객체는 스코프가 참조하는 대상이 된다

2. 초기화 단계(Initialization phase)  
   변수 객체(Variable Object)에 등록된 변수를 위한 공간을 메모리에 확보한다. 이 단계에서 변수는 undefined로 초기화된다.

3. 할당 단계(Assignment phase)  
   undefined로 초기화된 변수에 실제 값을 할당한다.

**var 키워드로 선언된 변수는 선언 단계와 초기화 단계가 한번에 이루어진다.**  
스코프에 변수를 등록(선언 단계)하고 메모리에 변수를 위한 공간을 확보한 후, undefined로 초기화(초기화 단계)한다. 따라서 변수 선언문 이전에 변수에 접근하여도 스코프에 변수가 존재하기 때문에 에러가 발생하지 않는다. 다만 undefined를 반환한다. 이후 변수 할당문에 도달하면 비로소 값이 할당된다. 이러한 현상을 변수 호이스팅(Variable Hoisting)이라 한다.

```js
let foo = 1 // 전역 변수

{
  console.log(foo) // ReferenceError: foo is not defined
  let foo = 2 // 지역 변수
}
```

> 출처: [poiemaweb](https://poiemaweb.com/es6-block-scope)
