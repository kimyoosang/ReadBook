# 질의 함수를 매개변수로 바꾸기

## Before

- 사용자는 온도조절기로 온도를 설정 할 수 있지만, 목표 온도는 난방 계획에서 정한 범위에서만 선택 할 수 있는 실내온도 제어 시스템

```javascript
class HeatingPlan {
  get targetTemperature() {
    if (thermostat.selectedTemperature > this._max) {
      return this._max;
    } else if (thermostat.selectedTemperature > this._min) {
      return this._min;
    } else {
      return thermostat.selectedTemperature;
    }
  }
}

//호출자
if (thePlan.targetTemperature > thermostat.currentTemperature) {
  setToHeat();
} else if (thePlan.targetTemperature < thermostat.currentTemperature) {
  setToColl();
} else {
  return setOff();
}
```

## After

- targetTemperature()메서드가 전역 객체인 thermostat에 의존하고 있다. 이 전역 객체에 건네는 질의 메서드를 매개변수로 옮겨서 의존성을 끊어보자

1. 첫 번째로 변수 추출하기를 이용하여 이 메서드에서 사용할 매개변수를 준비한다
2. 매개변수의 값을 구하는 코드를 제외한 나머지를 메서드로 추출한다
3. 방금 추출한 변수를 인라인하면 원래 메서드에는 단순한 호출만 남게된다
4. 이어서 이 메서드까지 인라인한다
5. 새 메서드의 이름을 원래 메서드의 이름으로 바꾼다

```javascript
class HeatingPlan {
  get targetTemperature() {
    return this.xxNEWtargetTEmperature(selectedTemperature);
  }
  targetTemperature(selectedTemperature) {
    if (selectedTemparature > this._max) {
      return this._max;
    } else if (selectedTemparature > this._min) {
      return this._min;
    } else {
      return selectedTemparature;
    }
  }
}

//호출자
if (
  thePlan.targetTemperature(thermostat.selectedTemperature) >
  thermostat.currentTemperature
) {
  setToHeat();
} else if (
  thePlan.targetTemperature(thermostat.selectedTemperature) <
  thermostat.currentTemperature
  setToColl()
) else {
  return setOff();
}
```
