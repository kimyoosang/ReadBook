# 임시 변수를 질의 함수로 바꾸기

## Before

간단한 주문 클래스

```javascript

class Order {
  contructor(quantity. item) {
    this._quantity = quantity;
    this._item = item;
  }
  get price() {
    var basePrice = this._quantity * this._item.price;
    var discountFactor = 0.98;

    if(basePrice > 1000) {
      discountFactor -= 0.03;
      return basePrice * discountFactor;
    }
  }
}

```

## After

- 임시 변수인 basePrice와 discountFactor를 메서드로 바꾼다

1. basePrice에 const를 붙여 읽기 전용으로 만든다
2. 대입문의 우변을 게터로 추출한다
3. 변수를 인라인한다
4. discountFactor도 같은 순서로 처리한다. 먼저 함수 추출하기다
5. discountFactor에 값을 대입하는 문장이 둘인데, 모두 추출한 함수에 넣어야 한다
6. 원본 변수는 마찬가지로 const로 만든다
7. 마지막으로 변수 인라인한다

```javascript

class Order {
  contructor(quantity. item) {
    this._quantity = quantity;
    this._item = item;
  }
  get price() {
    const discountFactor = this.discountFactor;
    var discountFactor = 0.98;

    if(basePrice > 1000) {
      discountFactor -= 0.03;
    }
    return basePrice * this.discountFactor;
  }
  get basePrice() {
    return this._quantity * this._item.price;
  }
  get discountFactor() {
    var discountFactor = 0.98;
    if(this.basePrice > 1000) {
      discountFactor -= 0.03;
    }
    return discountFactor;
  }
}

```
