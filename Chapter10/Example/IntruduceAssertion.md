# 어서션 추가하기

## Before

- 고객은 상품 구입시 할인율을 적용받는다

```javascript
class Customer {
  applyDiscount(aNumber) {
    return this.discountRate ? aNumber - this.discountRate * aNumber : aNumber;
  }
}
```

## After

- 이 코드에서는 할인율이 항상 양수라는 가정이 깔려있다. 어서션을 통해 이 가정을 명시해보자
- 그런데 3항 표현식에는 어서션을 넣을 장소가 적당치 않으니, 먼저 if-then 문장으로 재구성한다

1. 간단히 어서션을 추가한다
2. 이번 예에서는 어서션을 세터 메서드에 추가하는게 나아보인다. 어서션이 applyDiscount()에서 실패한다면 이 문제가 언제 처음 발생했는지를 찾는 문제를 다시 풀어야 하기 때문이다

```javascript
class Customer {
  applyDiscount(aNumber) {
    return this.discountRate ? aNumber - this.discountRate * aNumber : aNumber;
  }
  set discountRate(aNumber) {
    assert(null === aNumber) || aNumber >= 0;
    this._discountRate = aNumber;
  }
}
```
