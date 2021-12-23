---
lang: ko
title: 마크다운 문법
description: 기본적인 마크다운 문법 소개
---

# Markdown 문법

## Header

```md
# h1

## h2

### h3

#### h4

##### h5

###### h6
```

> h6까지 지원  
> h3까지 사이드바 자동완성 (vuepress)

## BlockQuete(블럭인용문자)

**Input**

```md
> first blockquete
>
> > second blockquete
> >
> > > third blockquete
```

**Output**

> first blockquete
>
> > second blockquete
> >
> > > `third blockquete`

이 안에 다른 마크다운 요소 사용 가능

## 목록

### 순서있는 목록(번호)

**Input**

```md
1. 첫번째
2. 두번째
3. 세번째
```

**Output**

1. 첫번째
2. 두번째
3. 세번째

> 순서를 1,3,2 로 바꿔도 1,2,3 으로 출력(무조건 내림차순)

### 순서없는 목록

**Input**

```
- 대분류
  - 중분류
    - 소분류
      - 소소분류
```

**Output**

- 대분류
  - 중분류
    - 소분류
      - 소소분류

> `+`,`*`,`-` 모두 사용 가능, 혼합 사용 가능

## 코드강조

**Input**

```md
`문법 일부를 텍스트에 적을때 이걸 쓰면 보기 좋음`
```

**Output**

`문법 일부를 텍스트에 적을때 이걸 쓰면 보기 좋음`

> mac에서 백틱 ₩ 누르면 됨. 한영전환하면 ` 나올거임.

## 코드블럭

코드블럭을 사용하는데 다른 `<code>`태그 등 다른 방법이 있긴 하지만, vuepress는 방법에 따라 UI가 달라지는 점이 있기 때문에 제가 주로 쓰는 방식만 소개함.

**Input**

````md
```js
const name = "아벨박"
```
````

**Output**

```js
const name = "아벨박"
```

> 문법강조를 지원하는 플랫폼에서는 상단 3백틱 옆에 사용 언어를 적어주면 가독성 좋아짐

## 수평선

**Input**

```md
---
```

**Output**

---

> 이거 외에도 `***` 등 여러 방법이 있는데 `---`로 대동단결 합시다. vscode 자동완성도 이렇게됨.

## 링크

**Input**

```md
[페이지 열리는 링크](https://google.com, "마우스오버 했을때 보이는거 빼도됨")  
[같은 페이지 내에서 이동](../git/commit-conventtion.html#필요성)  
[태그로 이동](#header)

url 그대로 노출: <https://google.com>  
이메일링크: <parkhm0829@gmail.com>

이렇게 [참조 링크]를 사용해도 됩니다

[참조 링크]: https://naver.com "설명 적어도됨"
```

**Output**

[페이지 열리는 링크](https://google.com, "마우스오버 했을때 보이는거 빼도됨")  
[같은 페이지 내에서 이동](../git/commit-conventtion.html#필요성)  
[태그로 이동](#header)

url 그대로 노출: <https://google.com>  
이메일링크: <parkhm0829@gmail.com>

이렇게 [참조 링크]를 사용해도 됩니다

[참조 링크]: https://naver.com "설명 적어도됨"

> 태그로 이동은 소문자로, 띄어쓰기는 `-`으로 연결하고, 영문이어야 함.(사이드바에 생성된 태그 찍어서 붙여넣기하면 한글도 되긴함)  
> ex) `[블럭인용문자로 이동](#blockquete-블럭인용문자)` [블럭인용문자로 이동](#blockquete-블럭인용문자)

## 강조

**Input**

```md
_기울임_  
**두껍게**  
~~취소선~~
```

**Output**

_기울임_  
**두껍게**  
~~취소선~~

## 이미지

**Input**

```md
![알트속성은 이곳입니다](/images/logo-apeach.png "타이틀 속성을 넣고싶으면 여기에, 이거 빼도됨")  
[![이미지에 링크넣는방법!](/images/logo-apeach.png "이미지에 링크를 넣어봅니다")](https://abeldevlog.netlify.app/)
```

**Output**

![알트속성은 이곳입니다](/images/logo-apeach.png "타이틀 속성을 넣고싶으면 여기에, 이거 빼도됨")  
[![이미지에 링크넣는방법!](/images/logo-apeach.png "이미지에 링크를 넣어봅니다")](https://abeldevlog.netlify.app/)

## 줄바꿈

**Input**

```md
줄바꾸려면 마지막문장에서 띄어쓰기 2번
이건 안한거임

줄바꾸려면 마지막문장에서 띄어쓰기 2번  
이건 한거임

태그<br>써도됨
```

**Output**

줄바꾸려면 마지막문장에서 띄어쓰기 2번
이건 안한거임

줄바꾸려면 마지막문장에서 띄어쓰기 2번  
이건 한거임

태그<br>써도됨

## 테이블

`<table>` 태그로 변환됨
헤더 셀을 구분할때 3개 이상의 `---` 기호가 필요함
헤더 셀을 구분하면서 `:` 기호로 셀 안의 내용 정렬 가능

**Input**

```md
| 값         |                     의미                     |   기본값 |
| :--------- | :------------------------------------------: | -------: |
| `static`   |        유형(기준) 없음 / 배치 불가능         | `static` |
| `relative` |                                              |
| `absolute` | 위치 상 **_부모_(조상)요소**를 기준으로 배치 |
```

**Output**

| 값         |                     의미                     |   기본값 |
| :--------- | :------------------------------------------: | -------: |
| `static`   |        유형(기준) 없음 / 배치 불가능         | `static` |
| `relative` |                                              |
| `absolute` | 위치 상 **_부모_(조상)요소**를 기준으로 배치 |

## 원시 HTML

**Input**

```md
<u>마크다운에서 지원하지 않는 기능</u>을 사용할 때 유용하며 대부분 잘 동작함

<img src="/images/logo-apeach.png" width="40%" height="30%" title="사이즈 변경원한다면" alt="귀여운 어피치" />
```

**Output**

<u>마크다운에서 지원하지 않는 기능</u>을 사용할 때 유용하며 대부분 잘 동작함

<img src="/images/logo-apeach.png" width="40%" height="30%" title="사이즈 변경원한다면" alt="귀여운 어피치" />

> 참조: [ihoneymon GitHub](https://gist.github.com/ihoneymon/652be052a0727ad59601), [heropy 블로그](https://heropy.blog/2017/09/30/markdown/)
