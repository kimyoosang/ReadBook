# 조건부 로직을 다형성으로 바꾸기

## Before

- 새의 종에 따른 비행 속도와 깃털 상태를 알고싶어한다

```javascript
function plumages(birds) {
  return new Map(birds.map((b) => [b.name, plumage(b)]));
}

function speeds(birds) {
  return new Map(birds.map((b) => [b.name, airSpeedVelocitye(b)]));
}

function plumage(bird) {
  //깃털상태
  switch (bird.type) {
    case "유럽제비":
      return "보통이다";
    case "아프리카 제비":
      return bird.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
    case "노르웨이 파랑 앵무":
      return bird.voltage > 100 ? "그을렸다" : "예쁘다";
    default:
      return "알 수 없다";
  }
}

function airSpeedVelocity(bird) {
  //비행속도
  switch (bird.type) {
    case "유럽제비":
      return 35;
    case "아프리카 제비":
      return 40 - 2 * bird.numberOfCoconuts;
    case "노르웨이 파랑 앵무":
      return bird.isNailed ? 0 : 10 + bird.voltage / 10;
    default:
      return null;
  }
}
```

## After

- 세 종류에 다라 다르게 동작하는 함수가 몇개 보이니 종류별 클래스를 만들어서 각각에 맞는 동작을 표현하면 좋을것 같다

1. airSpeedVelocity()와 plumage()를 Bird라는 클래스로 묶는다
2. 종별 클래스를 만든다. 적합한 서브클래스의 인스턴스를 만들어줄 팩터리 함수도 만든다
3. 객체를 얻을 때 팩터리 함수를 사용하도록 수정한다
4. 두 조건부 메서드를 처리하기 위해 먼저 plumage()부터 switch문의 절 하나를 선택해 해당 서브클래스에서 오버라이드 한다
5. 테스트하고 잘 동작한다면 다음 조건절을 처리한다
6. 슈퍼클래스의 메서드는 기본 동작용으로 남겨좋는다. 같은 과정을 airSpeedVelocity()에도 수행한다

```javascript

class Bird { {}
  constructor(birdObject) {
    Object.assign(this, birdObject)
  }
  get plumage() {
    return '알 수 없다'
  }
  get airSpeedVelocity() {
    return null
  }

  get airSpeedVelocity() {
    switch (this.type) {
    case "유럽제비":
      return "보통이다";
    case "아프리카 제비":
      return this.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
    case "노르웨이 파랑 앵무":
      return this.voltage > 100 ? "그을렸다" : "예쁘다";
    default:
      return "알 수 없다";
  }
  }
}

function createBird(bird) {
   switch (this.type) {
    case "유럽제비":
      return new EuropeanSwallow(bird)
    case "아프리카 제비":
      return new AfricanSwallow(bird)
    case "노르웨이 파랑 앵무":
      return new NorwegiamBlueParrot(bird)
    default:
      return new Bird(bird)
  }
}

class EuropeanSwallow extends Bird  {
  get plumage() {
    return '보통이다'
  }
  get airSpeedVelocity() {
    return 35
  }
}
class AfricanSwallow extends Bird {
  get plumage() {
    return 40 -2 * this.numberOfCoconuts
  }
  get airSpeedVelocity() {
    return (this.numberOfCoconuts > 2) ? '지쳤다':'보통이다'
  }
}
class NorwegiamBlueParrot extends Bird  {
  get plumage() {
    return (this.voltage > 100) ? '그을렸다':'예쁘다'
  }
  get airSpeedVelocity() {
    return (this.isNailed) ? 0 : 10 + this.voltage / 10
  }
}

function plumages(birds) {
  return new Map(birds.map(b=> createBirds(b)).map(bird => [bird.name, bird.plimage]))
}

function speeds(birds) {
  return new Map(birds.map(b=> createBirds(b)).map(bird => [bird.name, bird.airSpeedVelocity]))
}

function plumage(bird) {
 return createBird(bird).plumage
}

function airSpeedVelocity(bird) {
  return createBird(bird).airSpeedVelocity
}
```
