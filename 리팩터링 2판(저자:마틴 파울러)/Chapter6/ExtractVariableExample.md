# 1. 간단한 계산식

## Before

```javascript
function price(order) {
  //기격(price) = 기본 가격 - 수량 할인 + 배송비
  return (
    order.quantity * order.itemPrice -
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(order.quantity * order.itemPrice * 0.1, 100)
  );
}
```

## After

1. 기본 가격은 상품 가격(itemPrice)에 수향(quantity)를 곱한 값임을 파악해내야한다
2. 이 로직을 이해했다면 기본 가격을 담을 변수를 만들고 적저한 이륾을 지어준다
3. 이 변수를 실제로 사용해야 하므로 원래 표현식에서 새로 만든 변수에 해당하는 부분을 교체한다
4. 방금 교체한 표현식이 쓰이는 부분이 더 있다면 마찬가지로 새 변수를 사용하도록 수정한다
5. 그다음 줄은 수향 할인이다. 수량 할인도 추출하고 배송비도 똑같이 처리한다
6. 다 수정했다면 주석은 지워도된다. 주석에서 한말이 코드에다 드러나기 때문이다

```javascript
function price(order) {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount =
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(order.basePrice * order.itemPrice * 0.1, 100);

  return basePrice - quantityDiscount + shipping;
}
```

# 2. 1과 같은 코드를 클래스 문맥 안에서 처리하는 방법

## Before

```javascript
class Order {
  constructor(aRecord) {
    this._data = aRecord;
  }

  get quantity() {
    return this._data.quantity;
  }
  get itemPrice() {
    return this._data.itemPrice;
  }

  get price() {
    return (
      this.quantity * this.itemPrice -
      Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 +
      Math.min(this.quantity * this.itemPrice * 0.1, 100)
    );
  }
}
```

## After

- 여기서도 추출하려는 이름은 같다. 하지만 그 이름이 가격을 계산하는 price()메서드의 범위를 넘어, 주문을 표현하는 Order 클래스 전체에 적용된다. 이처럼 클래스 전체에 영향을 줄때는 변수가 아닌 메소드로 추출한다

```javascript
class Order {
  constructor(aRecord) {
    this._data = aRecord;
  }

  get quantity() {
    return this._data.quantity;
  }
  get itemPrice() {
    return this._data.itemPrice;
  }

  get price() {
    return this.basePrice - this.quantityDiscount + this.shipping;
  }

  get basePrice() {
    return this.quantity * this.itemPrice;
  }
  get quantityDiscount() {
    return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;
  }
  get shipping() {
    return Math.min(this.basePrice * 0.1, 100);
  }
}
```
