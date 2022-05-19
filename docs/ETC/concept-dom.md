---
lang: ko
title: DOM이란?
description: DOM 개념 정리
routeMeta:
  tags: [ETC]
  category: 이론
---

# DOM

DOM은 Document Object Model의 줄임말이며, **HTML 문서를 객체 기반으로 표현한 것이다.**  
웹페이지에 대한 인터페이스라고 한다. DOM이 인터페이스 이므로, 우리는 DOM을 통해 웹페이지의 컨텐츠, 구조, 스타일을 읽고 조작할 수 있다.

DOM의 객체 구조는 '노드 트리'라고도 불린다. 왜냐하면, DOM을 루트에서부터 여러 노드들이 가지치며 나오는 트리로 생각할 수 있기 때문이다. 루트의 `<html>` element로 부터 중첩된 여러 element가 뻗어나오게 되며, 말단 노드에는 각 element의 content가 있는 형태이다.

다음의 HTML 문서는 아래와 같은 노드 트리로 표현된다. html 태그로부터, head, body node가 나오게 되며, 트리의 leaf에는 컨텐츠들이 있는 것을 확인할 수 있다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <!-- Page Body -->
    <h2>My Page</h2>
    <p id="content">Thank you for visiting my web page!</p>
  </body>
</html>
```

위 HTML문서는 다음과 같은 노드 계층으로 구성되어있다.

![node tree](https://dmitripavlutin.com/static/75f1711be6313112e996905bd49c9951/0df09/dom-nodes.png)

HTML에 있는 tag (`<html>`, `<p>`와 같은...)들은 node를 표현하게 된다. 여기서 그저 text이더라도 node가 된다는 점이다. 노드트리를 보면, `<p>` 자식 노드로 text node가 있는 것을 확인할 수 있다.

## DOM이 아닌 것?

DOM이 HTML 문서와 1대1로 매핑되는 것 처럼 보이지만, 좀 더 자세히 알아보며 그 차이를 이해해야 한다.

### DOM은 원본 HTML이 아니다

DOM이 HTML 문서로부터 만들어지긴 했지만, 항상 정확하게 같지는 않다.

#### 1. **HTML이 유효하지 않을 경우**

DOM은 오로지 유효한 HTML 문서에 대한 인터페이스이다.
HTML을 파싱하며 DOM을 생성하는 과정에서, 브라우저는 HTML에서 문제가 있는 것들을 고칠 수도 있다.
예를 들어, 아래의 HTML과 같이 `<head>` 와 `<body>` 가 빠진 유효하지 않은 HTML의 경우, DOM은 head와 body를 추가하여 유효한 HTML로 고치게 된다.

```html
<!DOCTYPE html>
<html>
  Hello, world!
</html>
```

![유효하지 않을 경우 이미지](https://i.imgur.com/KbY9asL.png)

#### 2. **DOM이 자바스크립트에 의해 수정되었을 경우**

DOM은 정적인 것이 아니고, 동적으로 변경될 수 있다.  
 JS가 DOM에 수정을 가할 수 있는데, DOM에 노드를 추가하거나, 수정하느 등의 작업을 할 수 있다. 그러나 JS가 DOM을 변경한다고 하여서 HTML이 변경되는 것은 아니다.

### DOM이 브라우저에서 보여지는 것은 아니다.

브라우저 화면에서 보여지는 것은 렌더트리이며, 렌더트리는 DOM과 CSSOM을 합쳐서 구성하게 된다. DOM과 렌더트리의 차이는 렌더트리는 화면에 페인트될 것으로 구성되어있다는 것이다.

렌더트리는 오로지 무엇이 렌더링될지에 대해 관심을 갖기 때문에 보여지지 않는 부분은 렌더트리에서 제외가 된다.

> ex)  
> `display: none` 속성이 있는 element는 DOM에는 있지만, 보여지지 않기 때문에 렌더트리에는 빠진다.  
> 단, `visibility: hidden`은 마찬가지로 화면에 보이지는 않지만, 렌더트리에는 포함된다. 따라서, `visibility: hidden`으로 숨겨진 element는 보이지는 않지만, 실제 화면에서 그 공간을 차지하고는 있다.

> 참고: [DOM은 무엇인가? DOM Node와 Element의 차이](https://velog.io/@yejineee/DOM%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-DOM-Node%EC%99%80-Element%EC%9D%98-%EC%B0%A8%EC%9D%B4)
