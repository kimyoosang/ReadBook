# 조건식 통합하기. or사용하기

## Before

- 똑같은 결과로 이어지는 조건 검사가 순차적으로 진행되고 있다. 결과로 행하는 동작이 갍으므로 이 조건들을 하나의 식으로 통합해보다

```javascript
function disabilityAmount(anEmployee) {
  if (anEmployee.seniority < 2) {
    return 0;
  }
  if (anEmployee.monthsDisabled > 12) {
    return 0;
  }
  if (anEmployee.isPartTime) {
    return 0;
  }
}
```

## After

1. 순차적인 경우엔 or 연산자를 이용하면 된다
2. 테스트한후 그 다음 조건에도 적용한다
3. 모든 조건을 통합했다면 최종 조건식을 함수로 추출해볼 수 있다

```javascript
function disabilityAmount(anEmployee) {
  if (isNotEligibleForDisbility()) {
    return 0;
  }
}

function isNotEligibleForDisbility() {
  return (
    anEmployee.seniority < 2 ||
    anEmployee.monthsDisabled > 12 ||
    anEmployee.isPartTime
  );
}
```

# 조건식 통합하기. and사용하기

## Before

```javascript
if (anEmployee.onVavation) {
  if (anEmployee.senoirity > 10) {
    return 1;
  }
  return 0.5;
}
```

## After

- if문이 중첨되어 나오면 and를 사용해야 한다

```javascript
if (anEmployee.onVavation && anEmployee.senoirity > 10) {
  return 1;
}
return 0.5;
```
