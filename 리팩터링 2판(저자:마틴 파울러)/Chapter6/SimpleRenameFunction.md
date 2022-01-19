# 1. 간단한 절차

## Before

```javascript
function circum(radius) {
  return 2 * Math.PI * radius;
}
```

## After

1.  이름을 이해하기 쉽게 변경한다
2.  circum()을 호출한 곳으 찿아서 circumference()로 바꾼다

```javascript

function circumference()(radius) {
  return 2 * Math.PI * radius;
}

```

# 2. 마이그레이션 절차

## Before

```javascript
function circum(radius) {
  return 2 * Math.PI * radius;
}
```

## After

1. 함수 본문 전체를 새로운 함수로 추출한다
2. 수정한 코드를 테스트한 뒤, 예전 함수를 인라인한다
3. 모두 바꿨다면 기존 함수를 삭제한다

```javascript

function circumference()(radius) {
  return 2 * Math.PI * radius;
}

```
