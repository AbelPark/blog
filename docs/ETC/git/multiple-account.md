---
lang: ko
title: 여러 개의 GitHub 계정 사용하기
description: 여러 개의 GitHub 계정 사용하기
---

# MacOS에서 여러 개의 GitHub 계정 사용하기

## 필요성

각기 다른 github 계정를 하나의 PC에서 사용할 때.  
특히, private 레파지토리 사용시 `remote: Repository not found` 오류가 발생하곤 함.

## 원인

최초로 git을 사용하여 키체인에 등록된 계정 정보는, 다른 계정을 만들어 레파지토리 동기화를 시도할 때에도 최초로 키체인에 등록된 정보를 사용하기 때문에 오류가 발생함.

## 해결

각 계정별로 ssh key를 생성하고 github에 등록하면 됨

### 0. 조건

- _ssh 키들을 ~/.ssh 디렉토리에 관리_
- _이후 작업은 모두 이 경로에서 처리_
- _ssh 키는 사용할 github 계정수 만큼 생성,등록해 사용_

ssh 이름: **my**, 저장소 계정명: **abels**  
ssh 이름: **your**, 저장소 계정명: **yours**

### 1. remote repository 확인

`user@user-ui-MacBookAir your-repository` 여기는 레포지토리 내에서

```bash:no-line-numbers
$ git remote -v

> origin	git@github.com:abels/app.familycare.ai.git (fetch)
> origin	git@github.com:abels/app.familycare.ai.git (push)
> upstream	https://github.com/abels-lab/admin.familycare.ai.git (fetch) # upstream은 포크 뜬 레포라면 나올것임
> upstream	https://github.com/abels-lab/admin.familycare.ai.git (push)
```

### 2. 기존 키체인 정보 삭제

키체인 접근 앱 실행 > 왼쪽 기본 키체인 탭에서 로그인 선택 > github.com 삭제

### 3. ssh key 생성

`user@user-ui-MacBookAir .ssh` 이제부터 여기서 명령어를 입력하자

```bash:no-line-numbers
$ ssh-keygen -t rsa -b 4096 -C "abels@example.com" # 이메일은 github에 등록한 계정과 같은 메일을 등록한다.

> Generating public/private rsa key pair.
> Enter file in which to save the key (/Users/user/.ssh/id_rsa): id_rsa_my  # 생성할 파일 명 입력 (아니면 그냥 Enter key, 이 경우는 id_rsa라는 기본 파일로 생성됨)
> Enter passphrase (empty for no passphrase): # 비밀번호 설정할 경우 입력 (아니면 Enter key)
> Enter same passphrase again: # 비밀번호 설정할 경우 입력 (아니면 Enter key)
```

### 3. 백그라운드에서 ssh-agent를 시작

```bash:no-line-numbers
$ eval "$(ssh-agent -s)"

> Agent pid 59566
```

### 4. ssh key 추가

```bash:no-line-numbers
$ ssh-add -K ~/.ssh/id_rsa_my

> Identity added: /Users/<사용자 계정>/.ssh/id_rsa_my (abels@example.com)
```

### 5. 사용할 계정 수만큼 반복

결과확인

```bash:no-line-numbers
$ ls

> id_rsa_my id_rsa_my.pub id_rsa_your id_rsa_your.pub
```

### 6. github에 공개키 등록

'abels'계정으로 github.com 로그인 > Settings > SSH and GPG keys > New SSH Key

- Title: 아무거나해도됨
- Key: `id_rsa_my.pub`파일 내용을 그대로 복붙

### 7. ssh config 파일 설정

~/.ssh 디렉토리에 config 파일이 존재하는지를 확인하고 없다면 새로 생성.

```bash:no-line-numbers
$ touch config
```

config 파일 설정

```text:no-line-numbers
Host github.com-my    # my 계정 용
  HostName github.com
  IdentityFile ~/.ssh/id_rsa_my   # 비밀 키 파일
  User abels             # github.com 계정 명
Host github.com-your    # your 계정 용
  HostName github.com
  IdentityFile ~/.ssh/id_rsa_your   # 비밀 키 파일
  User yours             # github.com 계정 명
```

### 8. 사용

github.com에 Repository 정보에서 `HTTPS`, `SSH`, `Github CLI` 중 `SSH`를 선택하고 해당 주소 복사.  
주소는 `git@github.com:abels/your-repository.git` 이렇게 되어있을 텐데,  
우리는 ssh config 구성시 Host Name을 `github.com-` 으로 했기 때문에 아래와 같이 변경해서 사용.

- clone

```bash:no-line-numbers
$ git clone git@github.com-my:abels/your-repository.git
```

- remote 추가

```bash:no-line-numbers
$ git remote add origin git@github.com-my:abels/your-repository.git
```

- remote 변경

```bash:no-line-numbers
$ git remote set-url origin git@github.com-my:abels/your-repository.git
```

> 참고 [GitHub Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent), [모리스 소프트웨어 공작소](https://ccambo.blogspot.com/2020/12/git-macos-githubcom.html)
