# 1. 고객 클래스와 계약 클래스

## Before

```javascript
class Customer {
  constructor(name, discountRata) {
    this._name = name;
    this._discountRate = discountRage;
    this._contract = new CustomerContract(dateToday());
  }
  get discountRate() {
    return this._discountRate;
  }
  brcomePreferred() {
    this._discountRate += 0.03;
  }
  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this._duscountRate));
  }
}

class CustomerContract {
  contructor(starDate) {
    this._startDate = startDate;
  }
}
```

## After

- 할인율을 뜻하는 discountRate필드를 Customer에서 CustomerContract로 옮기고 싶다고 가정한다

1. 이 필드를 캡슐화한다.
2. CustomerContract 클래스에 필드 하나와 접근자들을 추가한다
3. 문장 슬라이드 하기를 적용해 \_setDiscountRate()호출을 계약 생성 뒤로 옮긴후, Custoemr 접근자들이 새로운 필드를 사용하도록 수정한다.
4. 테스트에 성공하면 접근자들을 다시 수정하여 새롱ㄴ 계약 인스턴스를 사용하도록 한다
5. 자바스크립트를 사용하고 있으므로 소스 필드를 미리 선언할 필요는 없었다. 그래서 제거해야 할 것도 없다

```javascript
class Customer {
  constructor(name, discountRata) {
    this._name = name;
    this._contract = new CustomerContract(dateToday());
    this._setDiscountRate(discountRate);
  }
  get discountRate() {
    return this._contract.discountRate;
  }
  _setDiscountRate(aNumber) {
    this._contract.discountRate = aNumber;
  }
  brcomePreferred() {
    this._setDiscountRate(this.discountRate + 0.03);
  }
  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this._duscountRate));
  }
}

class CustomerContract {
  contructor(starDate, discountRate) {
    this._startDate = startDate;
    this._discountRate = discountRate;
  }

  get discountRate() {
    return this._discountRate;
  }
  set discountRate(arg) {
    this._discountRate = arg;
  }
}
```

# 2. 공유 객체로 이동하기

## Before

```javascript
class Account {
  constructor(number, type, interesRate) {
    this._number = number;
    this._type - type;
    this._interesRate = interesteRate;
  }
  get interestRate() {
    return this._interestRate;
  }
}
class AccountType {
  constructor(namaeString) {
    this._name = nameString;
  }
}
```

## After

- 이 코드를 수정하여 이자율이 계좌 종류에 따라 정해지도록 하려고 한다

1. 이자율 필드는 이미 잘 캡슐화 되어있으니, 타깃이 AccountType에 이자율 필드와 필요한 접근자 메서드를 생성한다
2. 계좌 데이터를 데이터 베이스에 보관한다면 먽 데이터베이스를 확인해서 모든 계좌의 이자율이 계좌 종류에 부합하게 설정되어 있는지 확인한다. 계좌 클래스에 어서션을 추가한다
3. 어서션을 적용한 채 시스템을 잠시 운영보며 오류가 생기는지 지켜본다
4. 시스템의 겉보기 동작이 달라지지 않는다는 확신이 서면 이자율을 가져오는 부분을 변경한다
5. Account에서 이자율을 직접 수정하던 코드를 완전히 제거한다

```javascript
class Account {
  constructor(number, type) {
    this._number = number;
    this._type - type;
  }
  get interestRate() {
    return this._type.interestRate;
  }
}
class AccountType {
  constructor(namaeString, interestRate) {
    this._name = nameString;
    this._interestRate = interestRate;
  }
  get interestRate() {
    return this._interestRate;
  }
}
```
