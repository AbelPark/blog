---
lang: ko
title: 09 _ 타입 변환과 단축 평가
description: 타입 변환과 단축 평가
routeMeta:
  tags: [JS]
  category: 이론
---

## 9.1 타입 변환이란?

자바스크립트의 모든 값은 타입이 있다. 값의 타입은 개발자의 의도에 따라 다른 타입으로 변환할 수 있다. 이를 명시적 타입변환 또는 타입 캐스팅이라 한다.

```js
var x = 10

var str = x.toString()
console.log(typeof str, str) // string 10

// x 변수의 값이 변경된 것은 아니다
console.log(typeof x, x) // number 10
```

개발자의 의도와는 상관없이 표현식을 평가하는 도중에 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환되기도 한다. 이를 암묵적 타입 변환 또는 타입 강제 변환 이라 한다.

```js
var x = 10

var str = x + ""
console.log(typeof str, str) // string 10

console.log(typeof x, x) // number 10
```

명시적 타입 변환이나 암묵적 타입 변환이 기존 원식밧을 직접 변경하는 것은 아니다. 원시 값은 변경 불가능한 값이므로 변경할 수 없다. **타입 변환이란 기존 원시 값을 사용해 다른 타입의 새로운 원시 값을 생성하는 것이다.**

## 9.2 암묵적 타입 변환

## 9.3 명시적 타입 변환

### 9.3.1 문자열 타입으로 변환

```js
// 1. String 생성자 함수를 new 연산자 없이 호출하는 방법
String(1) // "1"
String(NaN) // "NaN"
String(Infinity) // "Infinity"
String(true) // "true"
// prettier-ignore
String(false) // "false"

// 2. Object.prototype.toString 메서드를 사용하는 방법
(1).toString() // "1"
(true).toString() // "true"

// 3. 문자열 연결 연산자를 이용하는 방법
1 + "" // "1"
NaN + "" // "NaN"
true + "" // "true"
```

### 9.3.2 숫자 타입으로 변환

```js
// 1. Number 생성자 함수를 new 연산자 없이 호출하는 방법

Number("0") // 0
Number("-1") // -1
Number("10.53") // 10.53
Number(true) // 1
Number(false) // 0

// 2. parseInt, parseFloat 함수를 사용하는 방법(문자열만 변환 가능)
parseInt("0") + // 0
  // 3. + 단항 산술 연산자 이용
  "0" + // 0
  "-1" + // -1
  true + // 1
  false // 0

// 4. * 산술 연산자를 이용하는 방법
"0" * 1 // 0
"-1" * 1 // -1
true * 1 // 1
```

### 9.3.3 불리언 타입으로 변환

```js
// 1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
Boolean("x") // true
Boolean("") // false
Boolean("false") // true

Boolean(0) // false
Boolean(1) // true
Boolean(NaN) // false
Boolean(Infinity) // true

Boolean(null) // false

Boolean(undefined) // false

Boolean({}) // true
Boolean([]) // true

// 2. ! 부정 논리 연산자를 두 번 사용하는 방법
!!"x" // true
!!"" // false
```

## 9.4 단축 평가

### 9.4.1 논리 연산자를 사용한 단축 평가

논리합(||)과 논리곱(&&) 연산자 표현식의 평가 결과는 불리언 값이 아닐 수도 있다. **논리합(||)과 논리곱(&&) 연산자 표현식은 언제나 2개의 피연산자 중 어느 한쪽으로 평가된다**

```js
"cat" && "dog" // "dog"
```

논리곱(&&) 연산자는 두 개의 피연산자가 모두 true로 평가될 때 true를 반환한다. 논리곱 연산자는 좌항에서 우항으로 평가가 진행된다.  
첫 번째 피연산자 'cat'은 Truthy 값이므로 true로 평가된다. 하지만 이 시점까지는 위 표현식을 평가할 수 없다. 두 번째 피연산자까지 평가해 보아야 위 표현식을 평가할 수 있다. 다시 말해, 두 번째 피연산자가 위 논리곱 연산자 표현식의 평가 결과를 결정한다.

논리합(||) 연산자도 논리곱(&&) 연산자와 동일하게 동작한다.

```js
"cat" || "dog" // "cat"
```

논리합(||) 연산자는 두 개의 피연산자 중 하나면 true로 평가되어도 true를 반환한다. 논리합 연산자도 좌항에서 우항으로 평가가 진행된다.
첫 번째 피연산자 'cat'은 truthy 값이므로 true로 평가된다. 이 시점에 두 번째 피연산자까지 평가해 보지 않아도 위 표현식을 평가할 수 있다. 이때 논리합 연산자는 논리 연산의 결과를 결정한 첫 번째 피 연산자, 즉 문자열 "cat"을 그대로 반환한다.

**이처럼 논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환한다. 이를 단축 평가라 한다. 단축 평가는 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 말한다.**

| 단축 평가 표현식    |     의미 |
| :------------------ | -------: |
| true \|\| anything  |     true |
| false \|\| anything | anything |
| true && anything    | anything |
| false && anything   |    false |

단축 평가를 사용하면 if 문을 대체할 수 있다.

```js
var done = true
var message = ""

if (done) message = "완료"

message = done && "완료"
console.log(message) // 완료
```

```js
var done = false
var message = ""

if (!done) message = "미완료"

message = done || "미완료"
console.log(message) // 미완료
```

**단축 평가를 유용하게 사용하는 방법**

- 객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때

```js
var elem = null
var value = elem.value // TypeError
```

```js
var elem = null
var value = elem && elem.value // null
```

- 함수 매개변수에 기본값을 설정할 때

함수를 호출할 때 인수를 전달하지 않으면 매개변수에는 undefined가 할당된다. 이대 단축 평가를 사용해 매개변수의 기본값을 설정하면 undefined로 인해 발생할 수 있는 에러를 방지할 수 있다.

```js
function getStringLength(str) {
  str = str || ""
  return str.length
}

getStringLength() // 0
getStringLength("hi") // 2

// ES6의 매개변수 기본값 설정
function getStringLength(str = "") {
  return str.length
}

getStringLength() // 0
getStringLength("hi") // 2
```

### 9.4.2 옵셔널 체이닝 연산자

ECMAScript2020에서 도입된 옵셔널 체이닝 연산자 `?.`는 좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.

```js
var elem = null

// elem이 null 또는 undefined이면 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
var value = elem?.value
console.log(value) // undefined
```

```js
// 옵셔널 체이닝이 없던 시절에는 &&를 사용한 단축평가를 통해 확인했다.

var elem = null

// elem이 Falsy값이면 elem으로 평가되고, elem이 Truthy 값이면 elem.value로 평가된다.
var value = elem && elem.value
console.log(value) // null
```

차이점은 논리 연산자 &&는 좌항 피연산자가 false로 평가되는 Falsy 값(false, undefined, null, 0, -0, NaN, '')면 좌항 피연산자를 그대로 반환한다.  
하지만 옵셔널 체이닝 연산자 `?.`는 Falsy값이라도 null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어간다.

### 9.4.3 null 병합 연산자

ECMAScript2020에서 도입된 null 병합(nullish coalescing) 연산자 ??는 **좌항의 피연산자가 null 또는 undefined인 경우에 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.**

```js
var foo = null ?? "default"
console.log(foo) // 'default'
```

??는 변수에 기본값을 설정할 때 유용하다.  
기존에는 || 를 사용했는데

```js
// Falsy 값이 나오면 예기치 못한 동작 발생
var foo = "" || "default"
console.log(foo) // 'default'
```

```js
// 하지만 nullish는 걱정없다
var foo = "" || "default"
console.log(foo) // ""
```
