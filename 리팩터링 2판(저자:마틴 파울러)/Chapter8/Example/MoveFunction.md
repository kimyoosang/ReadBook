# 1. 중첩 함수를 최상위로 옮기기

## Before

```javascript
function trackSummary(points) {
  const totalTime = calculatetime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;
  return {
    time: titalTime,
    distance: totalDistance,
    pace: pace,
  };

  function calculateDistance() { //총 거리 계산
    let result = 0;
    for (let i = 0; i < points.length; i++) {
      result += dustance(points[i - 1], points[i]);
    }
    return result;
  }
  function distance(p1,p2) {...} //두 지점의 거리 계산
  function radians(degree) {...} //라디안 값으로 변환
  function calculateTime() {...} //총 시간 계산
}
```

## After

- 이 함수에서 중첩 함수인 calculatedistance()를 최상위로 옮겨서 추적 거리를 다른 정보와는 독립적으로 계산하게 바꾼다

1. 이 함수를 최상위로 복사한다. points는 매개변수로 넘긴다
2. distance()는 radians()만 사용하며, radians()는현재 컨텍스트에 있는 어떤 것도 사용하지 않는다. 따라서 두 함수를 매개변수로 넘기기 보다는 함께 옮겨버리는게 낫다. 현재 컨텍스트에서 이 함수들을 calculateDistance()함수 안으로 옮긴다
3. 같은 내용을 새로 만든 top_calculateDistance()함수로도 복사한다
4. 소스 함수인 calculateDistance()의 본문을 수정하여 top_calculateDistance()를 호출하게 한다
5. 소스 함수는 호출자가 많지 않은, 상당히 지역화된 함수다. 그러니 소스 함수는 제거하는 편이 낫다
6. 새 함수의 이름을 totalDistance()로 바꾼다. 근데 이 변수를 남겨둘 이유가 없으니 변수 인라인하기로 해결한다
7. distance()와 radians()함수도 titalDistance()안의 어떤 것에도 의존하지 않으니, 이들 역시 최상위로 옮긴다. 그러면 네 함수 모두 최상위가 된다

```javascript
function trackSummary(points) {
  const totalTime = calculatetime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;
  return {
    time: titalTime,
    distance: totalDistance,
    pace: pace,
  };
  function totalDistance(points) {
    let result = 0;
    for (let i = 0; i < points.length; i++) {
      result += distance(points[i - 1], points[i]);
    }
    return result;
  }
}
function trackSummary(points) {...}
function totalDistance(points) {...}
function distance(p1,p2) {...}
function radians(degress) {...}
```

# 2. 다른 클래스로 옮기기

## Before

```javascript
class Account {
  get bankCharge() {
    let result = 4.5;
    if (this._datOverdrawn > 0) result += this.overdraftCharge;
    return result
  }

  get overdraftCharge() {
    if(this.type.isPrime) {
      const baseCharge = 10
      if(this.daysOverdrawn <= 7) return baseCharge
      else if {
        return baseCharge + (this.daysOverdrawn - 7) * 0.85
      }
      else {
        return this.daysOverdrawn * 1.75
      }
    }
  }
}
```

## After

- 계좌 종류에 따라 이자 책정 알고리즘이 달라지도록 고친다. 그러기위해 마이너스 통장의 초과 인출 이자를 계산하는 overdraftCharge()를 계좌 종류 클래스인 AccountType으로 옮긴다

1. overdraftCharge()메서드가 사용한는 기능중, daysOverdrawn()메서드는 Account 클래스에 남겨줘야 한다
2. overdraftCharge()메서드 본문을 AccountType클래스로 복사한 후 새 보금자리에 맞게 정리한다
3. 원래 메서드의 본문을 수정하여 새 메서드를 호출하도록 한다
4. 이제 위임 메서드인 overdraftCharge()를 인라인한다

```javascript
class AccountType {
  overdraftCharge(datsOverdrawn) {
    if (this.isPremium) {
      const baseCharge = 10;
      if (datsOverdrawn <= 7) {
        return baseCharge;
      } else {
        return baseCharge + (daysOverdrawn - 7) * 0.85;
      }
    } else {
      return daysOverdrawn * 1.75;
    }
  }
  get bankCharge() {
    let result = 4.5;
    if (this._datOverdrawn > 0) {
      result += this.type.overdraftCharge(this.daysOverdrawn);
    }
    return result;
  }
}
```
