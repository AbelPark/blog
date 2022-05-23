---
lang: ko
title: scope란?
description: 스코프 이해하기
routeMeta:
  tags: [JS]
  category: 이론
---

# scope

스코프(Scope)란 **'변수에 접근할 수 있는 범위'**를 뜻한다.

## global scope

전역에 선언되어있어 어느 곳에서든지 해당 변수에 접근할 수 있다

## local scope

해당 지역에서만 접근할 수 있어 지역을 벗어난 곳에선 접근할 수 없다

### function-scoped

- 자바스크립트에서 함수를 선언하면 함수를 선언할 때마다 새로운 스코프를 생성하게 된다. - 함수 몸체에 선언한 변수는 해당 함수 몸체 안에서만 접근할 수 있다.
- 전역 함수 외부에서 생성한 변수는 모두 전역 변수이다.(전역 변수를 남발할 가능성을 높인다.)
- for 문의 변수 선언문에서 선언한 변수를 for 문의 코드 블록 외부에서 참조할 수 있다.

```js
var a = 1 // 전역 스코프
function print() {
  // 지역(함수) 스코프
  var a = 111
  console.log(a)
}
print() // 111
console.log(a) // 1
```

print 함수에서 console.log(a);는 a를 출력하기 위해 자신의 함수 스코프 안에 변수 a가 있는지 찾아본다. var a = 111; 을 찾아내면 111을 console에 출력하고 함수는 자신의 역할을 마친다.

만약 print 함수 안에 변수 a의 선언을 지운다면 console엔 어떤 값이 출력될까?  
**함수 스코프 안에 a가 존재하지 않으니까 a가 선언되어있지 않다는 에러를 출력할까?**

```js
var a = 1 // 전역 스코프
function print() {
  // 함수 스코프
  console.log(a)
}
print() // 1
```

하지만 결과는 1이 출력된다.  
해당 결과는 Scope Chain에 의해 일어나는 현상이다. 현재 자신의 scope에서 사용하고자 하는 변수가 없다면 Scope Chain을 통해 해당 변수를 찾게 된다.

### Block-level scope

모든 코드 블록(함수, if 문, for 문, while 문, try/catch 문 등) 내에서 선언된 변수는 코드 블록 내에서만 유효하며 코드 블록 외부에서는 참조할 수 없다. 즉, 코드 블록 내부에서 선언한 변수는 지역 변수이다.

```js
var foo = 123 // 전역 변수

console.log(foo) // 123

{
  var foo = 456 // 전역 변수
}

console.log(foo) // 456
```

블록 레벨 스코프를 따르지 않는 var 키워드의 특성 상, 코드 블록 내의 변수 foo는 전역 변수이다. 그런데 이미 전역 변수 foo가 선언되어 있다. var 키워드를 사용하여 선언한 변수는 중복 선언이 허용되므로 위의 코드는 문법적으로 아무런 문제가 없다. 단, 코드 블록 내의 변수 foo는 전역 변수이기 때문에 전역에서 선언된 전역 변수 foo의 값 123을 새로운 값 456으로 재할당하여 덮어쓴다.

```js
let foo = 123 // 전역 변수

{
  let foo = 456 // 지역 변수
  let bar = 456 // 지역 변수
}

console.log(foo) // 123
console.log(bar) // ReferenceError: bar is not defined
```

let 키워드로 선언된 변수는 블록 레벨 스코프를 따른다. 위 예제에서 코드 블록 내에 선언된 변수 foo는 블록 레벨 스코프를 갖는 지역 변수이다. 전역에서 선언된 변수 foo와는 다른 별개의 변수이다. 또한 변수 bar도 블록 레벨 스코프를 갖는 지역 변수이다. 따라서 전역에서는 변수 bar를 참조할 수 없다.

> 출처:[poiemaweb.com](https://poiemaweb.com/es6-block-scope)
