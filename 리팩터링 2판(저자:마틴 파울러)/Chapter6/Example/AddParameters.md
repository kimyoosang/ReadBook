# 1. 매개변수 추가하기

## Before

```javascript
//Book 클래스
addReservation(customer) {
  this._reservations.push(customer);
}

```

## After

1. addReservation()을 호출하는 곳을 모두 찾고 고치기가 쉽지 않다면 마이그레이션 절차대로 진행해야 한다
2. addReservaion()의 본문을 마이그레이션 절차를 따라 새로운 함수로 추출한다
3. 그 다음 새 함수의 선언문과 호출문에 원하는 매개변수를 추가한다
4. 기존 함수를 인라인하여 호출 코드들이 새 함수를 이용하도록 고친다
5. 다 고쳤다면 새 함수의 이름을 기존 함수의 이름으로 바꾼다

```javascript
//Book 클래스
addReservation(customerx, isPriority) {
  assert(isPriority === true || isPriority === false); //호출하는 곳에서 새로 추가한 매개변수르 실제로 사용하는지 확인
  this._reservations.pusj(customer)
}

```

# 2. 매개변수를 속성으로 바꾸기

## Before

```javascript
//고객이 뉴잉글랜드에 살고있는지 확인하는 함수
function inNewEngland(aCustomer) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(aCustomer.address.state);
}

//위 함수를 사용하는 호출문
const newEnglanders = someCustomer.filter((c) => inNewEngland(c));
```

## After

1. inNewEngland함수가 고객이 아니라 주 식별 코드르 매개변수로 받으면 고객에 대한 의존성이 제거되어 더 넒은 문맥에 활용할 수 있다
2. 매개변수로 사용할 코드를 변수로 추출한다
3. 함수 추출하기로 새 함수를 만든다
4. 그런 다음 기존 함수 안에 변수로 추출해둔 입력 매개변수를 인라인한다
5. 함수 인라인하기롤 기존 함수의 본문을 호출문들에 집어넣는다
6. 함수 선언 바꾸기를 다시 한번 적용하여 새 함수의 이름을 기존 함수의 이름으로 바꾼다

```javascript
//고객이 뉴잉글랜드에 살고있는지 확인하는 함수
function inNewEngland(stateCode) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

//위 함수를 사용하는 호출문
const newEnglanders = someCustomer.filter((c) => inNewEngland(c.address.state));
```
