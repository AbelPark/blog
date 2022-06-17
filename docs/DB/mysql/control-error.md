---
lang: ko
title: 에러 컨트롤
description: react & vue 비교
routeMeta:
  tags: [Mysql]
  category: 기술
---

# 에러 컨트롤

## Division 0 Error

Mysql에서 나눗셈 연산시 분모가 0인경우 Division 0 에러가 발생한다.  
따라서 0인경우 1로 처리를 해주도록하자. 분모가 0인경우 분자도 0인경우가 대부분이다. 그게 아니라면 식이 잘못되었거나.

```sql
SELECT IF(2 > 1, 'TRUE', 'FALSE') AS result
-- if(조건, 조건이 참인경우, 참이 아닌경우)
```
