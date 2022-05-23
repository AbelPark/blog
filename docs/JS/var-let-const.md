---
lang: ko
title: var let const
description: var, let, const의 차이
routeMeta:
  tags: [JS]
  category: 이론
---

# var, let, const의 차이점?

## var

- [Function-level scope](../JS/concept-scope.md#function-scoped)
- 변수 중복 선언 허용
- 변수 [호이스팅](../JS/concept-hoisting.md)(변수를 선언하기 이전에 참조할 수 있다.)

> 전역 변수는 유효 범위(scope)가 넓어서 어디에서 어떻게 사용될 것인지 파악하기 힘들며, 비순수 함수(Impure function)에 의해 의도하지 않게 변경될 수도 있어서 복잡성을 증가시키는 원인이 된다.

ES6는 이러한 var 키워드의 단점을 보완하기 위해 let과 const 키워드를 도입하였다.

## let

- [block-level-scoped](../JS/concept-scope.md#block-level-scope)
- 변수 중복 선언 금지
- 호이스팅
- let 키워드로 선언된 변수를 전역 변수로 사용하는 경우, let 전역 변수는 전역 객체의 프로퍼티가 아니다. 즉, window.foo와 같이 접근할 수 없다. let 전역 변수는 보이지 않는 개념적인 블록 내에 존재하게 된다.

```js
var foo = 123 // 전역변수

console.log(window.foo) // 123
```

```js
let foo = 123 // 전역변수

console.log(window.foo) // undefined
```

## const

const는 상수(변하지 않는 값)를 위해 사용한다. 하지만 반드시 상수만을 위해 사용하지는 않는다. 이에 대해서는 후반부에 설명한다. const의 특징은 **let과 대부분 동일하므로 let과 다른 점만 살펴보도록 하자.**

- let은 재할당이 자유로우나 const는 재할당이 금지된다.

```js
const FOO = 123
FOO = 456 // TypeError: Assignment to constant variable.
```

- 주의할 점은 const는 반드시 선언과 동시에 할당이 이루어져야 한다는 것이다. 그렇지 않으면 다음처럼 문법 에러(SyntaxError)가 발생한다.

```js
const FOO; // SyntaxError: Missing initializer in const declaration
```

- const는 let과 마찬가지로 블록 레벨 스코프를 갖는다.
- const는 객체에도 사용할 수 있다. 물론 이때도 재할당은 금지된다.

```js
const obj = { foo: 123 }
obj = { bar: 456 } // TypeError: Assignment to constant variable.
```

- 이때 객체의 프로퍼티는 보호되지 않는다. 즉 말하자면 **재할당은 불가능하지만 할당된 객체의 내용(프로퍼티의 추가, 삭제, 프로퍼티 값의 변경)은 변경할 수 있다.**

```js
const user = { name: "Lee" }

// const 변수는 재할당이 금지된다.
// user = {}; // TypeError: Assignment to constant variable.

// 객체의 내용은 변경할 수 있다.
user.name = "Kim"

console.log(user) // { name: 'Kim' }
```

## 결론

- ES6를 사용한다면 var 키워드는 사용하지 않는다.
- 재할당이 필요한 경우에 한정해 let 키워드를 사용한다. 이때 변수의 스코프는 최대한 좁게 만든다.
- 변경이 발생하지 않는(재할당이 필요 없는 상수) 원시 값과 객체에는 const 키워드를 사용한다. const 키워드는 재할당을 금지하므로 var, let 보다 안전하다.
