---
lang: ko
title: vuepress 시작하기
description: vuepress 시작하기
---

# VuePress 시작하기

## VuePress 란?

VuePress는 마크다운 중심의 static site 생성기.  
현재 페이지도 vuepress로 만들고 [Netlify](https://www.netlify.com/)로 배포함.

시작은 [공식문서](https://vuepress2.netlify.app/)에 매우 잘 나와있으니 여길 보고 따라하면 됨.

이 페이지에서는 vuepress 사용시 거의 필수적으로 필요한(~~내가 사용한 것만~~) configuration, reference를 소개하고자 함.

공식문서는 온갓 것들을 다 써놓았기 때문에 필요한거 이정도만 적당히 해 놓고 필요한 부분은 찾아서 추가 하도록 하자.

## vuepress 디렉토리 구조

vuepress를 가이드 대로 따라 설치하고 나면

```text:no-line-numbers
├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
├─ .gitignore
└─ package.json
```

이런 식으로 구성이 되었을 것임.

여기서 `.vuepress`에서 나머진 필요없고 `config.js`만 수정해서 사용하면 된다.  
(`public/images` 폴더에는 사용할 이미지 넣어서 쓰면된다.)

## Reference

vuepress의 기본적인 세팅값이 정리되어 있다.

### Config

#### Site Config

`config.js`에 적용할 세팅값

##### lang

`<html lang="ko">` lang="ko"를 만들어주기 위한 옵션  
한국인이면 ko

##### title

최상단 브라우저 탭 텍스트 설정 옵션

##### description

`<meta name="description" content="Front-end 개발자 블로그">`

페이지 메타태그 description의 content 속성값 설정 옵션

##### head

페이지 최상단 텍스트 링크 설정, 파비콘 설정

```js
head: [["link", { rel: "icon", href: "/images/logo-apeach.png" }]]
```

##### themeConfig

logo, sidebar 설정가능
새해복믾이받으세요
파이팅!