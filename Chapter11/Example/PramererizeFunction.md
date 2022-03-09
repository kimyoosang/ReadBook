# 함수 매개변수화하기

## Before

- 대역(band)를 다루는 세 함수의 로직이 상당히 비슷한건 사실이며, 매개변수화 함수로 통합할 수 있을만큼 비슷한것도 사실이지만 직관적이지 않다

```javascript
function baseCharge(usage) {
  if (usage < 0) {
    return usd(0);
  }
  const amount =
    bottomBand(usage) * 0.03 + middleBand(usage) * 0.05 + topBand(usage) * 0.07;
  return usd(amount);
}

function bottomBand(usage) {
  return Math.min(usage, 100);
}
function middleBand(usage) {
  return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}
function topBand(usage) {
  return usage > 200 ? usage - 200 : 0;
}
```

## After

1. 비슷한 함수들을 매개변수화 하여 통합할 때는 먼저 대상 함수 중 하나를 골라 매개변수를 추가한다. 단, 다른 함수들까지 고려해 선택해야 한다. 지금 예처럼 범위를 다루는 로직에서는 대개 중간에 해당하는 함수에서 시작한느 게 좋다. 그러니 middleBand()에 매개변수를 추가하고 다른 호출들을 여기에 맞춘다
2. middleBand()는 리터럴을 두개 사용하며,그 각각은 중간 대역의 하한과 상한을 뜻한다. 함수 선언 바꾸기를 적용한다
3. 함수 선언 바꾸기를 적용하고 이 리터럴들을 호출 시점에 입력하도록 바꾼다. 이 과정에서 함수 이름도 배개변수화된 기능에 어올리게 수정한다
4. 함수에서 사용하던 리터럴들을 적절한 매개변수로 대체한다. 나머지 매개변수로 대체한다
5. 대역의 하한을 호출하는 부분도 새로 만든 매개변수화 함수를 호출하도록 바꾼다
6. 이제 로직이 의도한 대로 동작하니 초기의 보포 구문을 제거해도 되지만, 논리적으로는 필요없어졌다고 해도 예외 상황에서의 대처 방식을 잘 설명해주므로 그냥 두어도 된다

```javascript
function wuthinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0;
}

function baseCharge(usage) {
  if (usage < 0) {
    return usd(0);
  }
  const amount =
    withinBand(usage, 0, 100) * 0.03 +
    withinBand(usage, 100, 200) * 0.05 +
    withinBand(usage, 200, infinity) * 0.07;
  return usd(amount);
}

function middleBand(usage) {
  return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}
```
