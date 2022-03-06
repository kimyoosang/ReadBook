# 값을 참조로 바꾸기

## Before

- 주문 데이터를 생성자에서 JSON 문서로 입력받아 필드들을 채운다
- 이 과정에서 주문 데이터에 포함된 고객 ID를 사요에해 고객 객체를 생성한다

```javascript
class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = new Customer(data.customer); //data.customer가 고객 ID이다
    //다른 데이터를 읽어 들인다
  }
  get customer() {
    return this._customer;
  }
}
class Customer {
  contructor(id) {
    this._id = id;
  }
}
```

## After

- 고객 ID가 123인 주문을 다섯 개 생성한다면 독립된 고객 객체가 다섯 개 만들어진다. 이중 하나를 수정하더라도 나머지 네 개에는 반영되지 않는다. 모두를 같은 값으로 갱신해야 한다.

1. 항상 물리적으로 똑같은 고객 객체를 사용하고 싶다면 먼저 이 유일한 객체를 저장해둘 곳이 있어야 한다. 저장소 객체를 사용한다
2. 주문의 생성자에서 올바른 고객 객체를 얻어오는 방법을 찾는다. 이번 예에서는 고객 ID가 입력 데이터 스트림으로 전달되니 쉽게 해결가능하다
3. 수정한다
4. 이제 특정 주문과 고나련된 고객 정보를 갱신하면 같은 고객을 공유하는 주문 모두에서 갱신된 데이터를 사용하게 된다

- 이 예시 코드는 생성자 본문이 전역 저장소와 결합된다는 무넺가 있다. 전역 객체는 독한 약처럼 신중히 다뤄야 한다. 이 점이 염려된다면 저장소를 생성자 매개변수로 전달되도록 수정하자

```javascript
class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = registerCustomer(data.customer);
    //다른 데이터를 읽어 들인다
  }
  get customer() {
    return this._customer;
  }
}
class Customer {
  contructor(id) {
    this._id = id;
  }
}

let _repositoryData;

export function initialize() {
  _repositoryData = {};
  _repositoryData.customers = new Map();
}
export function registerCustomer(id) {
  if (!_repositoryData.custoemrs.has(id)) {
    _repositoryData.customers.set(id, new Customer(id));
  }
  return findCustomer(id);
}
export function findCustomer(id) {
  return _repositoryData.customers.get(id);
}
```
