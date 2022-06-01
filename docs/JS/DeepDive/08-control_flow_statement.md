---
lang: ko
title: 08 _ 제어문
description: 제어문
routeMeta:
  tags: [JS]
  category: 이론
---

## 8.1 블록문

블록문은 0개 이상의 문을 중괄호로 묶은 것으로, 코드 블록 또는 블록이라고 부르기도 한다. 자바스크립트는 블록문을 하나의 실행 단위로 취급한다. 블록문은 단독으로 사용할 수도 있으나 일반적으로 제어문이나 함수를 정의할 때 사용하는 것이 일반적이다.  
문의 끝에는 세미콜론을 붙이는 것이 일반적이다. 하지만 블록문은 언제나 문의 종료를 의미하는 자체 종결성을 갖기 때문에 블록문의 끝에는 세미콜론을 붙이지 않는다.

```js
// 블록문
{
  var foo = 10
}

// 제어문
var x = 1
if (x < 10) {
  x++
}

// 함수 선언문
function sum(a, b) {
  return a + b
}
```

## 8.2 조건문

조건문은 주어진 조건식의 평가 결과에 따라 코드 블록(블록문)의 실행을 결정한다.  
조건식은 불리언 값으로 평가될 수 있는 표현식이다.  
if ... else, switch 문이 대표적

```js
if (조건식1) {
  // 조건식1이 참이면 이 코드블록 실행
} else if (조건식2) {
  // 조건식2가 참이면 이 코드블록 실행
} else {
  // 조건식1과 2가 모두 거짓이면 이 코드블록 실행
}

// 코드블록 내에 문이 1개면 중괄호 생략가능
var num = 2
var kind
if (num > 0) kind = "양수"
else if (num > 0) kind = "음수"
else kind = "영"
```

```js
var month = 2
var monthName

switch (month) {
  case 1:
    monthName = "Jan"
  case 2:
    monthName = "Feb"
  case 3:
    monthName = "Mar"
  default:
    monthName = "Invalid"
}
console.log(monthName) // Invalid

// 위 코드는 코드블록에서 break로 탈출하지 않았기 때문에 실행흐름이 다음 case문으로 연이어 이동한다.

switch (month) {
  case 1:
    monthName = "Jan"
    break
  case 2:
    monthName = "Feb"
    break
  case 3:
    monthName = "Mar"
    break
  default:
    monthName = "Invalid"
}
// default에는 break를 생략하는 것이 일반적이다
console.log(monthName) // Feb
```

```js
// break를 생략한 폴스루가 유용한 경우. 윤년 계산

var year = 2000
var month = 2
var days = 0

switch (month) {
  case 1:
  case 3:
  case 5:
  case 7:
  case 8:
  case 10:
  case 12:
    days = 31
    break
  case 4:
  case 6:
  case 9:
  case 11:
    days = 30
    break
  case 2:
    // 윤년 계산 알고리즘
    // 1. 연도가 4로 나누어떨어지는 해(2000, 2004...)는 윤년이다.
    // 2. 연도가 4로 나누어 떨어지더라도 년도가 100으로 나누어 떨어지는 해 (2000, 2100...)는 평년이다
    // 3. 연도가 400으로 나누어 떨어지는 해(2000, 2400...)는 윤년이다.
    days = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28
    break
  default:
    console.log("Invalid month")
}

console.log(days) // 29
```

## 8.3 반복문

반복문은 조건식의 평가 결과가 참인 경우 코드 블록을 실행한다. 그 후 조건식을 다시 평가하여 조건식이 거짓일 때까지 반복한다.  
자바스크립트는 for, while, do ... while 문을 제공한다

### 8.3.1 for 문

for문은 조건식이 거짓으로 평가될 때까지 코드 블록을 반복 실행한다.

```js
// 주사위 두 눈의 합이 6이 되는 모든 경우의 수
for (let i = 1; i <= 6; i++) {
  for (let j = 1; j <= 6; j++) {
    if (i + j === 6) console.log(`[${i}, ${j}]`)
  }
}
```

### 8.3.2 while 문

while문은 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행한다.  
**for문은 반복 횟수가 명확할 때 주로 사용하고 while 문은 반복 횟수가 불명확할 때 주로 사용한다.**

```js
var count = 0

// if문으로 탈출 조건을 만들 수 있다.
while (true) {
  console.log(count)
  count++
  if (count === 3) break
}
```

### 8.3.2 do ... while 문

do ... while문은 코드 블록을 먼저 실행하고 조건식을 평가한다. 따라서 코드 블록은 무조건 한 번 이상 실행된다.

```js
var count = 0

do {
  console.log(count) // 0 1 2
  count++
} while (count < 3)
```

## 8.4 break 문

break 문은 레이블 문(식별자가 붙은 문), 반복문, switch 문의 코드 블록을 탈출한다.

```js
if(true) {
  break // SyntaxError
}
```

```js
// foo라는 식별자가 붙은 레이블 블록문
foo: {
  console.log(1)
  break foo // foo 레이블 블록문을 탈출한다.
  console.log(2)
}

console.log("Done!")
// 1 Done!
```

```js
// outer라는 식별자가 붙은 레이블 for 문
outer: for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    if (i + j === 3) break outer
    console.log(`inner [${i},${j}]`)
  }
}

console.log("Done!")
```

```js
// 특정 문자의 인덱스(위치)를 검색하는 예
var string = "hello world"
var search = "l"
var index

// 문자열은 유사 배열이므로 for 문으로 순회할 수 있다.
for (let i = 0; i < string.length; i++) {
  if (string[i] === search) {
    index = i
    break
  }
}

console.log(index) // 2

// 참고로 String.prototype.indexOf 메서드를 사용해도 같은 동작을 한다.
console.log(string.indexOf(search)) // 2
```

## continue 문

continue 문은 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킨다. break 문 처럼 반복문을 탈출하지는 않는다.

```js
// 문자열에서 특정 문자의 개수를 세는 예
var string = "hello world"
var search = "l"
var count = 0

for (let i = 0; i < string.length; i++) {
  if (string[i] !== search) continue
  count++
}

console.log(count)

// 참고로 String.prototype.match 메서드를 사용해도 같은 동작을 한다.
const regexp = new RegExp(search, "g")
console.log(string.match(regexp).length) // 3
```

아래는 위의 코드와 동일하게 동작한다.

```js
for (var i = 0; i < string.length; i++) {
  if (string[i] === search) count++
}
```

```js
//continue 문을 사용하지 않으면 if 문 내에 코드를 작성해야 한다.
for (var i = 0; i < string.length; i++) {
  if (string[i] === search) {
    count++
    // code
    // code
    // code
  }
}

//continue 문을 사용하면 if 문 밖에 코드를 작성할 수 있다.
for (var i = 0; i < string.length; i++) {
  if (string[i] !== search) continue
  count++
  // code
  // code
  // code
}
```
