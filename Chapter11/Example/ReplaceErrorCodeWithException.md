# 오류 코드를 예외로 바꾸기

## Before

- 전역 테이블에서 배송지의 배송 규칙을 알아내는 코드

```javascript
//최상위 함수
const status = calculateShippingCosts(orderData);
if (status < 0) {
  errorList.push({ order: orderData, errorCode: status });
}

function localShippingRules(country) {
  const data = countryData.shippingRules[country];
  if (data) {
    return new ShippingRules(data);
  } else {
    return -23;
  }
}

function calculateShippingCosts(anOrder) {
  //관련 없는 코드
  const shippingRules = localShippingRules(anOrder.country);
  if (shippingRules < 0) {
    return shippingRules; // 오류 전파
  }
  //더 관련 없는 코드
}
```

## After

1. 가정 먼저 최상위에 예외 핸들러르 갖춘다. localShippingRules()호출을 try 블록으로 감싸려 하지만 처리 로직은 포함하고 싶지 않다. 그래서 status 선언과 초기화를 분리한다
2. 이제 함수 호출을 try/catsh로 감쌀수 있다. 호출하는 쪽 코드의 다른 부분에서도 주문을 오류 목록에 추가할 일이 있을 수 있으니 적절한 핸들러가 이미 구비되어 있을 수 있다. 그렇다면 try블록을 수정해서 calculateShippingCosts() 호출을 포함시킨다
3. 이버ㅗㄴ 리팩터링으로 추가된 예외만을 처리하고자 한다면 다른 예외와 구별할 방법이 필요하다. 별도의 클래스를 만들어서 할 수도 있고 특별한 값을 부여하는 방법도 있다. 예외를 클래스 기반으로 처리하는 프로그래밍 언어가 많은데, 이런 경우라면 서브클래스를 만드는게 가장 자연스럽다. 자바스크립트는 여기에 해당하지 않지만 이런식으로 구현해본다
4. 이 클래스가 준비되면 오류 코드를 처리할 때와 같은 방식으로 이 예외 클래스를 처리하는 로직을 추가할 수 있다
5. 그런 다음 오류 검출 코드를 수정하여 오류 코드 대신 이 예외를 던지도록 한다
6. 코드를 다 작성했고 테스트도 통과했다면 오류 코드를 전파하는 임시 코드를 제거할 수 있다
7. 필요없어진 status 변수도 제거한다

```javascript
//최상위 함수

try {
  calculateShippingCosts(orderData);
} catch (e) {
  if (e instanceof OrderProcessingError) {
    errorList.push({ order: orderData, errorCode: e.code });
  } else {
    throw e;
  }
}

class OrderProcessingError extends Error {
  constructor(errorCode) {
    super(`주문 처리 오류 ${errorCode}`);
    this.code = errorCode;
  }
}

function localShippingRules(country) {
  const data = countryData.shippingRules[country];
  if (data) {
    return new ShippingRules(data);
  } else {
    throw new OrderProcessingError(-23);
  }
}

function calculateShippingCosts(anOrder) {
  //관련 없는 코드
  const shippingRules = localShippingRules(anOrder.country);

  //더 관련 없는 코드
}
```
