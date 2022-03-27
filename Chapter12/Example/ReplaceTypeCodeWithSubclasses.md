# 타입 코드를 서브클래스로 바꾸기 (직접 상속할 때)

## Before

```javascript
class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }
  validateType(arg) {
    if (!["enfineer", "manager", "salesperson"].includes(arg)) {
      throw new Error(`${arg}라는 직원 유형은 없습니다`);
    }
  }
  toString() {
    return `${this._name} (${this._type})`;
  }
}
```

## After

1. 타입 코드 변수를 자가 캡슐화 한다
2. 타입 코드 중 하나. 여기서는 엔지니어를 선택하여 직접 상속 방식으로 구현한다. 즉, 직원 클래스 자체를 서브클래싱 한다. 타입 코드 게터를 오버라이드하여 적절한 리터럴 값을 반환하기만 하면 된다
3. 생성자를 팩터리 함수로 바꿔서 선택 로직을 담을 별도 장소를 마련한다
4. 테스트한다
5. 모든 유형에 적용했다면 타입 코드 필드와 슈퍼클래스의 게터를 제거한다
6. 모든 게 정상인지 테스트후 검증 로직도 게저한다
7. 서브클래스들에는 타입 코드 게터가 여전히 남아있는데, 조건부 로직을 다형성으로 바꾸기와 메서드 내리기로 문제를 해결한다

```javascript
class Employee {
  constructor(name) {
    this._name = name;
  }

  validateType(arg) {
    if (!["enfineer", "manager", "salesperson"].includes(arg)) {
      throw new Error(`${arg}라는 직원 유형은 없습니다`);
    }
  }
  toString() {
    return `${this._name} (${this._type})`;
  }
}
class Engineer extends Employee {
  get type() {
    return "engineer";
  }
}
class Salesperson extends Employee {
  get type() {
    return "salesperson";
  }
}
class Manager extends Employee {
  get type() {
    return "manager";
  }
}
function createEmployee(name, type) {
  switch (type) {
    case "engineer":
      return new Engineer(name);
    case "salesperson":
      return new Salesperson(name);
    case "manager":
      return new Manager(name);
    default:
      throw new Error(`${type}라는 직원 유형은 없습니다`);
  }
}
```
