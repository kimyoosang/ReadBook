# 파생 변수를 질의 함수로 바꾸기

## Before

```javascript
class ProductionPlan {
  get product() {
    return this._production;
  }
  applyAdjustment(anAdjustment) {
    this._adjustment.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}
```

## After

- 이 코드는 조정 값 adjustment를 적용하는 과정에서 직접 관련이 없는 누적 값 production까지 갱신한다
- 그런데 이 누적 값은 매번 갱신하지 않고도 계산할 수 있다

1. 이 값을 계산해 낼수 있다는 걸 검증하기 위해 어서션을 추가한다
2. 테스트한다
3. 테스트가 성공하면 필드를 반환하던 코드를 수정하여 계산 결과를 직접 반환하도록 한다
4. 어서션을 위해 만들었던 calculateProduction()메서드를 인라인한다
5. 옛 변수를 참조하는 모든 코드를 죽은 코드 제거하기로 정리한다

```javascript
class ProductionPlan {
  get product() {
    return this._adjustments.reduce((sum, a) => sum + a.mount, 0);
  }
  applyAdjustment(anAdjustment) {
    this._adjustment.push(anAdjustment);
  }
}
```
