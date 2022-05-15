---
lang: ko
title: REST
description: REST 이해하기
---

# REST(Representational State Transfer)

## REST란?

자원을 이름(자원의 표현)으로 구분하여 해당 자원의 상태(정보)를 주고 받는 모든 것.
자원(resource)의 표현(representation)에 의한 상태전달

- 자원: 소프트웨어가 관리하는 모든것(문서, 그림, 데이터...)
- 자원의 표현: 자원을 표현하기 위한 이름(학생정보 DB가 자원 = 'students'가 표현)
- 상태(정보)전달: JSON, XML을 통해 데이터 송수신하는게 일반적
- 웹의 기존 기술과 [HTTP 프로토콜](https://developer.mozilla.org/ko/docs/Web/HTTP/Overview)을 그대로 활용하기 때문에 **웹의 장점을 최대한 활용할 수 있는 아키텍쳐 스타일**
- REST는 네트워크 상에서 클라이언트 / 서버 사이의 통신방식 중 하나
- 따라서 서버와 클라이언트의 역할을 명확하게 분리시켜준다.

> HTTP URI(Uniform Resource Identifier)를 통해 자원(Resource)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation(행동)을 적용하는 것을 의미한다.

💡 **CRUD Operation**

- Create : 생성(POST)
- Read : 조회(GET)
- Update : 수정(PUT)
- Delete : 삭제(DELETE)
- HEAD: header 정보 조회(HEAD)

## REST 구성 요소

- 자원(Resource): URI
  - 모든 자원에 고유한 ID가 존재하고, 이 자원은 Server에 존재한다.
  - Client는 URI를 이용해서 자원을 지정하고 해당 자원의 상태(정보)에 대한 조작을 Server에 요청한다.
- 행위(Verb): HTTP METHOD
  - HTTP 프로토콜은 GET, POST, PUT, DELETE 와 같은 메서드를 제공한다.
- 표현(Representations)
  - Client가 자원의 상태(정보)에 대한 조작을 요청하면 Server는 이에 적절한 응답(Representation)을 보낸다. (JSON, XML이 일반적)

## REST 특징

- **Server-Client(서버-클라이언트 구조)**

  - Server: 자원이 있는 쪽, Client: 자원을 요청하는 쪽
  - REST Server: API를 제공하고 비즈니스 로직 처리 및 저장을 책임진다.
  - Client: 사용자 인증이나 context(세션, 로그인 정보) 등을 직접 관리하고 책임진다.
  - 따라서 **서로 의존성이 줄어든다.**

- **Stateless(무상태)**

  - Client의 세션과 쿠키와 같은 context 정보를 Server에 저장하지 않는다.
  - Server는 각각의 요청을 완전히 별개의 것으로 인식하고 처리한다.
    - 각 API 서버는 Client의 요청만을 단순 처리한다.
    - 즉, 이전 요청이 다음 요청의 처리에 연관되어서는 안된다.
    - 물론 이전 요청이 DB를 수정하여 DB에 의해 바뀌는 것은 허용한다.
    - Server의 처리 방식에 일관성을 부여하고 부담이 줄어들며, 서비스의 자유도가 높아진다.

- **Cacheable(캐시 처리 가능)**

  - 웹표준 HTTP 프로토콜을 그대로 사용하므로 Last-Modified 태그나 E-Tag를 이용하면 캐싱 구현이 가능하다.
  - 캐시 사용을 통해 응답시간이 빨라지고 REST Server 트랜잭션이 발생하지 않기 때문에 전체 응답시간, 성능, 서버의 자원 이용률을 향상시킬 수 있다.

- **Layered System(계층화)**

  - REST 서버는 다중 계층으로 구성될 수 있으며 앞단에 보안, 로드 밸런싱, 암호화 계층을 추가해 구조상의 유연성을 둘 수 있다.
  - PROXY, 게이트웨이 같은 네트워크 기반의 중간매체를 사용할 수 있게 한다.

- **Uniform Interface(인터페이스 일관성)**

  - URI로 지정한 Resource에 대한 조작을 통일되고 한정적인 인터페이스로 수행한다.
  - HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능하다.

- **Self-descriptiveness (자체 표현 구조)**
  - REST API 메시지만 보고도 이를 쉽게 이해 할 수 있는 자체 표현 구조로 되어 있다.

## REST API (RESTful)

REST 기반으로 서비스 API를 구현한 것

**REST 원리를 따르는 시스템 = "RESTful" 하다**  
**RESTful의 목적 = 이해하고 사용하기 쉬운 REST API를 만드는** 것

## REST API 설계 기본 규칙

> - 도큐먼트 : 객체 인스턴스나 데이터베이스 레코드와 유사한 개념
> - 컬렉션 : 서버에서 관리하는 디렉터리라는 리소스
> - 스토어 : 클라이언트에서 관리하는 리소스 저장소

1. **URI는 정보의 자원을 표현해야 한다.**

   - resource는 동사보다는 명사를, 대문자보다는 소문자를 사용한다.
   - resource의 도큐먼트 이름으로는 단수 명사를 사용해야 한다.
   - resource의 컬렉션 이름으로는 복수 명사를 사용해야 한다.
   - resource의 스토어 이름으로는 복수 명사를 사용해야 한다.
     - Ex) `GET /Member/1` -> `GET /members/1`

2. **자원에 대한 행위는 HTTP Method(GET, PUT, POST, DELETE 등)로 표현한다.**

   - URI에 행위에 대한 동사 표현이 들어가면 안된다.(즉, CRUD 기능을 나타내는 것은 URI에 사용하지 않는다.)
     - Ex) `GET /members/show/1` -> `GET /members/1`
   - 경로 부분 중 변하는 부분은 유일한 값으로 대체한다.(즉, :id는 하나의 특정 resource를 나타내는 고유값이다.)

## REST API 설계 규칙

1. 슬래시 구분자(/ )는 계층 관계를 나타내는데 사용한다.

   - Ex) `http://restapi.example.com/houses/apartments`

2. URI 마지막 문자로 슬래시(/ )를 포함하지 않는다.

   - Ex) `http://restapi.example.com/houses/apartments/ (X)`

3. 하이픈(- )은 URI 가독성을 높이는데 사용
4. 가독성을 위해 밑줄(\_ )은 URI에 사용하지 않는다.
5. URI 경로에는 소문자로 한다.

   - RFC 3986(URI 문법 형식)은 URI 스키마와 호스트를 제외하고는 대소문자를 구별하도록 규정하기 때문

6. 파일확장자는 URI에 포함하지 않는다.

   - REST API에서는 메시지 바디 내용의 포맷을 나타내기 위한 파일 확장자를 URI 안에 포함시키지 않는다.
   - Accept header를 사용한다.
   - Ex) `http://restapi.example.com/members/soccer/345/photo.jpg (X)`
   - Ex) `GET / members/soccer/345/photo HTTP/1.1 Host: restapi.example.com Accept: image/jpg (O)`

7. 리소스 간에는 연관 관계가 있는 경우

   - /리소스명/리소스 ID/관계가 있는 다른 리소스명
   - Ex) `GET : /users/{userid}/devices` (일반적으로 소유 ‘has’의 관계를 표현할 때)

> 참조 [Heee's Development Blog](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html),
