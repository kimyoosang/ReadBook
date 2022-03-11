# 매개변수를 질의 함수로 바꾸기

## Before

- 다른 리팩터링을 수행한 뒤 특정 매개변수가 더는 필요 없어진 상황

```javascript
class Order {
  get finalPrice() {
    const basePrice = this.qyantity * this.itemPrice;
    let discountLevel;
    if (this.quantity > 100) {
      discountLevel = 1;
      return this.discountedPrice(basePrice, discountLevel);
    }
  }
  discountedPrice(basePrice, discountLevel) {
    switch (discountLevel) {
      case 1:
        return basePrice * 0.05;
      case 2:
        return (basePrice = 0.9);
    }
  }
}
```

## After

- 함수를 간소화해서 finalPrice를 나누면 finalPrice와 discountLevel 두 함수로 나눌 수 있다
- 이렇게 나누게디ㅗ면 duscountedPrice 함수에 discountLevel의 반환값을 건낼 이유가 사라진다

1. 이 매개변수를 참조하는 코드를 모두 함수 호출로 바꾼다
2. 이제 함수 선언 바꾸기로 이 매개변수를 없앨 수 있다

```javascript
class Order {
  get finalPrice() {
    const basePrice = this.qyantity * this.itemPrice;
    return this.discountedPrice(basePrice);
  }
  get duscountLevel() {
    return this.quantity > 100 ? 2 : 1;
  }
  discountedPrice(basePrice) {
    switch (this.discountLevel) {
      case 1:
        return basePrice * 0.05;
      case 2:
        return (basePrice = 0.9);
    }
  }
}
```
