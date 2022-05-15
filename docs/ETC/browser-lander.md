---
lang: ko
title: browser landering
description: 브라우저 렌더링 과정과 최적화
---

# 브라우저 렌더링 과정

## 필요성

브라우저의 렌더링 과정에 대한 이해가 있어야 **성능 최적화에 관한 Right way**를 판단할 수 있음

## 요약

1. DOM, CSSDOM 생성: HTML, CSS파일을 Object Model로 생성(순수 텍스트)
2. Render Tree 생성: 실제 화면 표현 노드 구성함(스타일 정보 설정됨)
3. Layout: viewport에 따라 노드의 위치, 크기 연산
4. Paint: 위치, 크기 외 컬러, 이미지 등의 효과가 모두 처리되어 화면에 그려짐

<figure>
  <img art="webkit" src='/images/browser-webkit.png'>
  <figcaption style="text-align:center;font-style: italic;">webkit flow</figcaption>
</figure>

<figure>
  <img art="gecko" src='/images/browser-gecko.png'>
  <figcaption style="text-align:center;font-style: italic;">gecko flow</figcaption>
</figure>

## 렌더링이란?

- 렌더링이란 HTML, CSS, JavaScript등 개발자가 작성한 문서를 브라우저에서 그래픽 형태로 출력하는 과정
- 브라우저는 렌더링을 수행하는 렌더링 엔진(Rendering Engine)을 가지고 있다.<sup id="a1">[[1]](#footnote01)</sup>
  따라서 렌더링 알고리즘에 차이가 있을 수 있으므로 **크로스브라우징 이슈가 발생할 것을 대비해야 함**

## 렌더링 과정

### 1. DOM(Document Object Model), CSSOM(CSS Object Model) 생성

서버로부터 받은 HTML, CSS를 다운로드 받는과정.  
HTML, CSS파일은 단순한 텍스트이므로 연산과 관리가 유리하도록 Object Model인 **DOM Tree(HTML), CSSOM(CSS)** 으로 만들어진다.

각 문서(HTML, CSS)가 어떻게 파싱되고 어떻게 DOM Tree가 되는지 자세한 과정은 [구글 개발자 문서]를 통해 확인.

렌더링 엔진은 더 나은 사용자경험을 위해 가능한 빠르게 내용을 표시하려한다.
**따라서 모든 HTML 파싱이 끝나기도 전에 이후의 과정을 수행하여 미리 사용자에게 보여줄 수 있는 일부 내용들을 출력함.**

### 2. Render Tree 생성

그 다음은 DOM Tree와 CSSOM Tree를 이용하여 Render Tree를 생성한다. 순수한 요소들의 구조와 텍스트만 존재하는 DOM Tree와는 달리 Render Tree에는 스타일 정보가 설정되어 있으며 **실제 화면에 표현되는 노드들로만** 구성된다.

예를들어, `display: none` 속성이 설정된 노드는 화면에 어떠한 공간도 차지하지 않기 때문에 Render Tree를 만드는 과정에서 제외된다.  
`visibility: invisible` 은 `display: none`과 비슷하게 동작하지만, 공간은 차지하고 요소가 보이지 않게만 하기 때문에 Render Tree에 포함된다.

### 3. Layout

Layout 단계는 브라우저의 뷰포트(Viewport)<sup id="a2">[[2]](#footnote02)</sup> 내에서 각 노드들의 정확한 위치와 크기를 계산한다. 즉, **생성된 Render Tree 노드들이 가진 스타일, 속성에 따라 브라우저 화면의 어느위치에 어느크기로 출력될지 계산하는 단계**인 것.  
Layout 단계를 통해 %, vh, vw와 같이 상대적인 위치, 크기 속성은 실제 화면에 그려지는 pixel단위로 변환됨.

### 4. Paint

Layout 계산이 완료된 후 **실제 화면을 그리는 단계**. 이 때 텍스트, 색, 이미지, 그림자 효과등이 모두 처리되어 그려짐.  
당연히 처리해야 하는 스타일이 복잡할수록 Paint 단계에 소요되는 시간이 늘어나게 되어 퍼포먼스가 떨어지게 됨.

### 5. 렌더링 최적화

위에서 언급한 렌더링 방식을 토대로 렌더링 최적화를 수행하는 방법은 어떤게 있을까?  
**Reflow & Repain 줄이기!!**

#### Reflow

Paint 과정 이후에도 액션이나 이벤트에 따라 html 요소의 크기나 위치등 레이아웃 수치를 수정하면 그에 영향을 받는 자식 노드나 부모 노드들을 포함하여 Layout 과정을 다시 수행하게 된다. 이때 Render Tree와 각 요소들의 크기와 위치를 다시 계산하게 되는데, 이러한 과정을 Reflow라 한다.

##### Reflow가 일어나는 경우

- 윈도우 리사이징(viewport 크기 변경)
- 노드 추가 제거
- DOM의 위치, 크기 변경
- 폰트 변경과(텍스트 내용) 이미지 크기 변경(크기가 다른 이미지로 변경 시)

#### Repaint

Reflow만 수행되면 실제 화면에 반영되지 않는다. 위에서 언급된 렌더링 과정과 같이 Render Tree를 다시 화면에 그려주는 과정이 필요하다. 결국은 Paint 단계가 다시 수행되며 이를 Repaint 라 한다.

**하지만!** 무조건 Reflow가 일어나야 Repaint가 일어나는것은 아니다.  
background-color, visibility와 같이 레이아웃에는 영향을 주지 않는 스타일 속성이 변경되었을 때는 Reflow를 수행할 필요가 없기 때문에 Repaint만 수행하게 된다.

#### Reflow & Repain 줄이기

##### 1) 사용하지 않는 노드에는 `visibilty: invisible` 보다 `display: none` 사용하기

`visibility: invisible`은 레이아웃 공간을 차지하기 때문에 Reflow의 대상이 된다.  
하지만 `display: none`은 Layout 공간을 차지하지 않아 Render Tree에서 제외됩니다.

##### 2) Reflow, Repaint 가 발생하는 속성 사용 피하기

- Reflow가 일어나는 대표적인 속성  
  position, width, height, left, top, right, bottom, margin, padding, border, border-width, clear, display, float, font-family,
  font-size, font-weight, line-height, min-height, overflow,
  text-align, vertical-align, white-space 외...

- Repaint가 일어나는 대표적인 속성  
  background, background-image, background-position, background-repeat, background-size, border-radius, border-style, box-shadow, color, line-style, outline, outline-color, outline-style, outline-width, text-decoration, visibility 외...

##### 3) 영향을 주는 노드 줄이기

Javascript + Css를 조합하여 애니메이션이 많거나 레이아웃 변화가 많은 요소의 경우 position을 absolute 또는 fixed를 사용하여 영향을 받는 주변 노드들을 줄일 수 있다. fixed와 같이 영향을 받는 노드가 전혀 없는 경우 Reflow과정이 필요 없어지기 때문에 Repaint 연산비용만 들게 된다.

또다른 방법은 애니메이션 시작시 요소를 absolute, fixed로 변경 후 애니메이션이 종료되었을 때 원상복구 하는 방법도 Reflow, Repaint 연산을 줄이는대에 도움이 된다.

##### 4) 프레임 줄이기

단순히 생각하면 0.1초에 1px씩 이동하는 요소보다 3px씩 이동하는 요소가 Reflow, Repaint 연산비용이 3배 줄어든다고 볼 수 있다. 따라서 부드러운 효과를 줄여 성능을 개선할 수 있다.

##### 5) virtual-DOM

vue, react 등 프론트엔드 프레임워크에서 사용하는 기법으로, 여러개의 노드를 수정하여 여러번의 레이아웃 재계산과정으로 리렌더링을 여러차례 수행하는 것이 아니라, 모든 변화를 하나로 묶어 리렌더링을 수행하게 만든다.

<figure>
  <img art="virtual dom" src='/images/browser-virtual_dom.png'>
  <figcaption style="text-align:center;font-style: italic;">https://codingmedic.wordpress.com/2020/11/10/the-virtual-dom/w</figcaption>
</figure>

사실, 이과정은 virtual DOM 이 없이도 이뤄질수 있다. 변화가 있을 때, 그 변화를 묶어서 DOM fragment 에 적용한 다음에 기존 DOM 에 던져주면 된다.  
결국 virtual DOM의 목적은 DOM fragment를 관리하는 과정을 수동으로 하나하나 작업 할 필요 없이, **자동화하고 추상화하는 것**에 있다. 뿐만 아니라, 기존 값 중 어떤게 바뀌었고 어떤게 바뀌지 않았는지 계속 파악하고 있어야하는데, 이것도 virtual DOM 이 이걸 자동으로 해주면서 수월한 작업을 가능하게 해준다.

---

<a name="footnote01">1.</a> 파이어폭스 Gecko, 사파리 Webkit, 크롬 Blink [↩](#a1)  
<a name="footnote02">2.</a> 그래픽이 표시되는 브라우저의 영역, 크기. viewport는 모바일의 경우 디스플레이의 크기, PC의 경우 브라우저 창의 크기에 따라 달라진다. 그리고 화면에 그려지는 각 요소들의 크기와 위치는 %, vh, vw와 같이 상대적으로 계산하여 그려지는 경우가 많기 때문에 viewport 크기가 달라질 경우 매번 계산을 다시해야 한다. [↩](#a2)

[구글 개발자 문서]: https://web.dev/critical-rendering-path-constructing-the-object-model/ "구글 개발자 문서"

> 참조 [박스여우 블로그](https://boxfoxs.tistory.com/408), [How Browsers Work: Behind the scenes of modern web browsers](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#DOM)
