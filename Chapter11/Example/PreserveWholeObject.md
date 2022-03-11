# 객체 통째로 넘기기

## Before

- 일일 최저/최고 기온이 난방 계획에서 정학 범위는 벗어나는지 확인하는 실내온도 모니터링 시스템

```javascript
//호출자
const low = aRoom.datsTempRange.low;
const high = aRoom.datsTempRange.high;
if (!aPlan.withinRange(low, high)) {
  alerts.push("방 온도가 지정 범위를 벗어났습니다");
}

class HeatingPlan {
  withinRange(bottom, top) {
    return (
      bottom >= this._temperatureRange.low && top <= this._temperatureRange.high
    );
  }
}
```

## After

- 최저/최고 기온을 뽑아내어 인수로 건네느 대신 범위 객체를 통째로 건넬 수도 있다

1. 가장 먼저 원하는 인터페이스를 갖춘 빈 메서드를 만든다
2. 그런 다음 새 메서드의 본문은 기존 withinRange() 를 호출하는 코드로 채운다. 자연스럽데 새 매개변수를 기본 매개변수와 매핑하는 로직이 만들어진다
3. 기존 함수를 호출하는 코드를 찾아서 새 함수를 호출하게 수정한다
4. 수정을 다 하면 기존 코드 중 더는 필요 없는 부분이 생길 수 있다. 죽은 코드이니 제거한다
5. 모두 새 함수로 대체했다면 원래 함수를 인라인 한다
6. 마지막으로 새 함수에서 보기 흉한 접두어를 제거하고 호출자들에게도 모두 반영한다. 접두어를 활용하면 이름 변경 기능을 제공하지 않는 코드편집기를 사요하더라도 전체 바꾸기를 간단히 수행할 수 있다

```javascript
//호출자

if (!aPlan.withinRange(aRoom.daysTemRange)) {
  alerts.push("방 온도가 지정 범위를 벗어났습니다");
}

class HeatingPlan {
  withinRange(aNumberRange) {
    return (
      aNumberRange.low >= this._temperatureRange.low &&
      aNumberRange.high <= this._temperatureRange.high
    );
  }
}
```
