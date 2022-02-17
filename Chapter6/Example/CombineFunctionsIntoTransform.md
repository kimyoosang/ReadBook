# 여러 함수를 변환 함수로 묶기

## Before

차 소비량을 계산하는 코드들

```javascript
reading = { customer: "ivan", quantity: "10", month: "5", year: "2017" };

//클라이언트1: 기본요금을 계산하는 코드
const aReading = anquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

//클라이언트2: 차에도 세금을 부과하는 코드.기본적인 차 소비량만큼은 면세
const aReading = anquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

//클라이언트3: 기본요금 계산 함수가 들어있는 코드
const aReading = anquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
```

## After

1. 입력 객체를 그대로 복사해 반환하는 변환함수를 만든다. 깊은 복사를 이용한다
2. 계산 로직에 측정값을 전달하기 전에 부가 정보를 덧붙이도록 수정한다. calculateBaseCharge()를 부가 정보를 덧붙이는 코드 근처로 옮긴다
3. 이 함수를 사용하던 클라이언트가 부가 정보를 담은 피드를 사용하도록 수정한다. calculateBaseCharge()를 호출하는 코드를 모두 수정했다면, 이 함수를 변환함수(enrichReading)안에 중첩시킨다
4. 클라이언트1도 이 필드를 사용하도록 수정한다. 이 때 baseCharge 변수도 인라인한다
5. 이제 세금을 부과할 소비량 계산에서 가장 먼저 변환함수부터 끼워넣는다. 여기서 기본요금을 계산하는 부분을 새로만든 필드롤 교체할 수 있다.
6. 테스트해서 문제가 없다면 base함수를 인라인한다. 그런 다음 계산 코드를 변환함수로 옮긴다
7. 이제 새로 만든 필드를 사용하도록 원본 코드를 수정한다. 테스트에 성공하면 taxableCharge 변수를 인라인한다

```javascript
reading = { customer: "ivan", quantity: "10", month: "5", year: "2017" };

//클라이언트1: 기본요금을 계산하는 코드
const rawReading = anquireReading();
const aReading = enrichReading(rawReading);
const baseCharge = aReading.baseCharge;

//클라이언트2: 차에도 세금을 부과하는 코드.기본적인 차 소비량만큼은 면세
const rawReading = anquireReading();
const aReading = enrichReading(rawReading);
const base = aReading.baseCharge;
const taxableCharge = aReading.taxableCharge;

//클라이언트3: 기본요금 계산 함수가 들어있는 코드
const rawReading = anquireReading();
const aReading = enrichReading(rawReading);
const basicChargeAmount = aReading.baseCharge;

///////////////
function enrichReading(original) {
  const result = _.cloneDeep(original); //깊은복사
  result.baseCharge = calculateBaseCharge(aReading);
  result.taxableCharge = Math.max(
    0,
    result.baseCharge - taxThreshold(result.year)
  );
  return result;
}
```
