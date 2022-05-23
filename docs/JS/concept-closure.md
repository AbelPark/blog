---
lang: ko
title: Closure란?
description: 클로저 이해하기
routeMeta:
  tags: [JS]
  category: 이론
---

# Closure

클로저는 독립적인 (자유) 변수를 가리키는 함수이다. 또는, 클로저 안에 정의된 함수는 만들어진 환경을 ‘기억한다’.(MDN)  
쉽게 말해, **흔히 함수 내에서 함수를 정의하고 사용하면 클로저**라고 한다.

```js
function getClosure() {
  var text = "variable 1"
  return function () {
    return text
  }
}

var closure = getClosure()
console.log(closure()) // 'variable 1'
```

```js
var base = "Hello, "
function sayHelloTo(name) {
  var text = base + name
  return function () {
    console.log(text)
  }
}

var hello1 = sayHelloTo("승민")
var hello2 = sayHelloTo("현섭")
var hello3 = sayHelloTo("유근")
hello1() // 'Hello, 승민'
hello2() // 'Hello, 현섭'
hello3() // 'Hello, 유근'
```

출력된 결과를 보면 text 변수가 동적으로 변화하고 있는 것처럼 보인다. 실제로는 text라는 변수 자체가 여러 번 생성된 것이다. 즉, hello1()과 hello2(), hello3()은 서로 다른 환경을 가지고 있다.
