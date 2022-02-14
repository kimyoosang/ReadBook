# 중첩 조건문을 보호 구문으로 바꾸기

## Before

- 직원 급여를 계산하는 코드
- 현직 지원만 급여를 받아야 하므로 이 함수는 두 가지 조건을 검사하고 있다

```javascript
function payAmount(employee) {
  let result;
  if (employee.isSeparated) {
    //퇴사한 직원인가?
    result = { amount: 0, reasonCode: "SEP" };
  } else {
    if (employee.isRetired) {
      //은퇴한 직원인가?
      result = { amount: 0, reasonCode: "RET" };
    } else {
      //급여 계산 로직
      lorem.ipsum(dolor.sitAmet);
      consectetur(adipiscing).elit();
      sed.do.eiumod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
      ut.enim.ad(minim.veniam);
      result = someFinalComputation();
    }
  }
  return result;
}
```

## After

- 중요한 일들이 중첩된 조건들에 가려져 잘 보이지 않는다. 이 코드가 진짜 의도한 일은 모든 조건이 거짓일 때만 실행되기 때문이다
- 이 상황에서는 보호 구문을 사용하면 코드의 의도가 더 잘 드러난다

1. 최상위 조건부터 보호구문으로 바꾼다
2. 변경후 테스트하고, 다음 조건으로 넘어간다
3. result 변수는 아무일도 하지 않으므로 제거한다(가변 변수를 제거하는 것이 좋다)

```javascript
function payAmount(employee) {
  if (employee.isSeparated) {
    //퇴사한 직원인가?
    return { amount: 0, reasonCode: "SEP" };
  }
  if (employee.isRetired) {
    //은퇴한 직원인가?
    return { amount: 0, reasonCode: "RET" };
  }
  //급여 계산 로직
  lorem.ipsum(dolor.sitAmet);
  consectetur(adipiscing).elit();
  sed.do.eiumod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
  ut.enim.ad(minim.veniam);
  return someFinalComputation();
}
```
