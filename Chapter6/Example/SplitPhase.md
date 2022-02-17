# 단계 쪼개기

# Before

삼품의 걀제 금액을 계산 하는 코드

```javascript
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  const shippingPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.freePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - disount + shippingCose;
  return price;
}
```

## After

- 상품 정보를 이용해서 결제금액 중상품가격을 계산하는것, 배송정보를 이용하여 결제 금액중 배송비를 계산 하는 것 이렇게 두 단계로 계산이 이루어져 있다
- 이 코드는 두 단계롤 나누는 것이 좋다

1. 배송비 계산 부분을 함수로 추출한다. 두 번째 단계에 필요한 데이터를 모두 개별 매개변수로 전달한다
2. 첫 번째 단계와 두 번째 단계가 주고받을 중간 데이터 구조를 만든다
3. 이제 새로 추출한 함수(applyShipping)에 전달되는 다양한 매개변수를 변환한다. 먼저 basePrice는 첫 번째 단계를 수행하는 코드에서 생성되기 때문에 중간데이터 구조로 옹ㄹㅁ기고 매개변수 목록에서 제거핞다
4. 다음으로 shippingMethod 매개변수는 첫 번쩨 단계에서는 사용하지 않으니 그대로 놔둔다. quantity는 첫 번째 단계에서 사용하지만 거기서 생성된것은 아니다. 그래서 그냥 매개변수로 놔둬도 되지만 최대한 중간 데이터 구조에 담는걸 선호하기 때문에 이 매개변수도 옮긴다
5. discount로 같은 방법으로 처리한다
6. 매개변수들을 모두 처리하면 중간 데이터 구조가 완성된다. 이제 첫 번째 단계 코드를 함수로 추춣하고 이 데이터 구조를 반환하게 한다
7. 최종 결과를 ㄹ담은 상수들(price)도 깔끔하게 정리한다

```javascript
function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculaterPriceData(product, quantity);
  return applyShipping(priceData, shippingMethod);
}

function calculaterPriceData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  return {
    basePrice: basePrice,
    quantity: quantity,
    discount: discount,
  };
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.freePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  return priceData.basePrice - priceData.disount + shippingCose;
}
```
