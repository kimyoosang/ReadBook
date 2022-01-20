# 여러 함수를 클래스로 묶기

## Before

차 계량기를 읽어서 측정값을 데이터 연산하는 함수들

```javascript
//측정값 데이터
reading = { customer: "ivan", quantity: "10", month: "5", year: "2017" };

//클라이언트1: 기본요금을 계산하는 코드
const aReading = anquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

//클라이언트2: 차에도 세금을 부과하는 코드.기본적인 차 소비량만큼은 면세
const aReading = anquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;
const taxableCharge = Math.max(0, base - taxThreshould(aReading.year));

//클라이언트3: 기본요금 계산 함수가 들어있는 코드
const aReading = anquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
```

## After

1. 레코드를 클래스롤 변환하기 위해 레코드를 캡슐화한다
2. 이미 만들ㄹ어져 있는 calculateBaseCharge()부터 새로 만든 클래스로 옮긴다
3. 첫 번째 클라이언트에서 중복된 계산 코드를 고쳐 앞의 메서드를 호출하게 한다
4. 새로 만든 기본요금 메서드를 사용하도록 수정한다
5. 세금을 부과할 소비량을 계산하는 코드를 함수로 추출한다
6. 그런 다음 방금 추출한 함수를 Reading 클래스로 옮긴다

```javascript
//측정값 데이터
reading = { customer: "ivan", quantity: "10", month: "5", year: "2017" };

//클라이언트1: 기본요금을 계산하는 코드
const rawReading = anquireReading();
const aReading = new Reading(rawReading);
const baseCharge = aReading.baseCharge;

//클라이언트2: 차에도 세금을 부과하는 코드.기본적인 차 소비량만큼은 면세
const rawReading = anquireReading();
const baseCharge = new Reading(rawReading);

function taxableChargeFn(aReading) {
  return Math.max(0, aReading.baseCharge - taxThreshould(aReading.year));
}

//클라이언트3: 기본요금 계산 함수가 들어있는 코드
const rawReading = anquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = aReading.taxableCharge;

class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }
  get customer() {
    return this._customer;
  }
  get quantity() {
    return this._quantuty;
  }
  get month() {
    return this._month;
  }
  get year() {
    return this._year;
  }
  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }
  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshould(this.year));
  }
}
```
