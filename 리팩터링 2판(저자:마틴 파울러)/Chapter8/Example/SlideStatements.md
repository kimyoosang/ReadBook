# 문장 슬라이드하기

- 조건문이 있을 때의 슬라이드

## Before

```javascript
let result;
if (availableResources.length === 0) {
  result = createResource();
  allocateResources.push(result);
} else {
  result = availableResources.pop();
  allocateResources.push(result);
}
return result;
```

## After

- 조건문의 안팎으로 슬라이드해야 할 때도 있다. 조건문 밖에서 슬라이드 할 때는 중복 로직이 제거될 것이고, 조건문 안으로 슬라이드할 때는 반대로 중복 로직히 추가될 것이다

1. 다음의 조건문의 두 분기에는 똑같은 문장이 포함되어 있다
2. 중복된 문장들을 조건문 밖으로 슬라이드하면, 조건문 블로 밖으로 꺼내는 순간 한 문장으로 합쳐진다

```javascript
let result;
if (availableResources.length === 0) {
  result = createResource();
} else {
  result = availableResources.pop();
}
allocateResources.push(result);
return result;
```
