# 플래그 인수 제거하기

## Before

- 배송일자를 계산하는 호출을 발견했다
- 이 코드들은 호출하는 쪽에서는 이 불리언 리터럴 값을 이용해서 어느 쪽 코드를 실행할지를 정한것이다
- 전형적인 플래그 인수다. 이 함수가 어느 코드를 실행할지는 전적으로 호출자의 지시에 따른다. 따라서 명시적인 함수를 사용해 호출자의 의도를 분명히 밝히는 편이 낫다

```javascript
function deliveryDate(anOrder, isRush) {
  if(isRush) {
    let deliveryTime
    if(['MA', 'NH'].includes(anOrder.deliveryState)) {
      deliveryTime = 1
    }
    else if(['NY', 'NH'].includes(anOrder.deliveryState)) {
      deliveryTime = 2
    }
    else {
      deliveryTime = 3
    }
    return anOrder.placedOn.plusDays(1 + deliveryTime)
  }
  else {
    let deliveryTime
    if(['MA', 'CT', ;;NY].includes(anOrder.deliveryState)) {
      deliveryTime = 2
    }
    else if(['NY', 'NH'].includes(anOrder.deliveryState)) {
      deliveryTime = 3
    }
    else {
      deliveryTime = 4
    }
    return anOrder.placedOn.plusDays(2 + deliveryTime)
  }
}

//호출 1
aShipment.delivertDate = delivertDate(anOrder, true)
//호출2
aShipment.delivertDate = delivertDate(anOrder, false)
```

## After

1. 조건문 분해하기를 적용한다
2. 호출을 분해된 조건문을 사용하여 수정한다

```javascript
function rushDeliveryDate(anOrder) {
  let deliveryTime
    if(['MA', 'NH'].includes(anOrder.deliveryState)) {
      deliveryTime = 1
    }
    else if(['NY', 'NH'].includes(anOrder.deliveryState)) {
      deliveryTime = 2
    }
    else {
      deliveryTime = 3
    }
    return anOrder.placedOn.plusDays(1 + deliveryTime)
}

function regularDeliveryDate(anOrder) {
  let deliveryTime
    if(['MA', 'CT', ;;NY].includes(anOrder.deliveryState)) {
      deliveryTime = 2
    }
    else if(['NY', 'NH'].includes(anOrder.deliveryState)) {
      deliveryTime = 3
    }
    else {
      deliveryTime = 4
    }
    return anOrder.placedOn.plusDays(2 + deliveryTime)
}

//호출 1
aShipment.delivertDate = rushDelivertDate(anOrder)
```
