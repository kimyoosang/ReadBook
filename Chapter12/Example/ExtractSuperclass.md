# 슈퍼클래스 추출하기

## Before

- 두 클래스를 사용하고 있는데, 공통된 기능이 눈에 띈다
- 연간 비용과 월간 비용이라는 개념, 그리고 이름이 여기에 속한다

```javascript
class Employee {
  constructor(name, id, monthlyCost) {
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
  get monthlyCost() {
    //월간 비용
    return this._monthlyCost;
  }
  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }
  get annualcost() {
    //연간 비용
    return this.monthlyCost * 12;
  }
}

class Department {
  constructor(name, staff) {
    this._name = name;
    this._staff = staff;
  }
  get staff() {
    return this._staff.slice();
  }
  get name() {
    return this._name;
  }

  get totalMonthlyCost() {
    //총 월간 비용
    return this.staff
      .map((e) => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }
  get headCount() {
    return this, staff.length;
  }
  get totalAnnualCost() {
    //총 연간 비용
    return this.totalMonthlyCost;
  }
}
```

## After

1. 빈 슈퍼클래스를만들고, 두 클래스가 이를 확장하도록 한다
2. 슈퍼클래스 추출하기를 적용할때 데이터부터 바꿔보자. 이때 자바스크립트에서는 생성자를 만져줘야 한다. 데이터를 슈포클래스로 옮겼으니 다음은 그 데이터와 고나련된 메서드들을 옮긴다

```javascript
class Employee {
  constructor(name, id, monthlyCost) {
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
  get monthlyCost() {
    //월간 비용
    return this._monthlyCost;
  }
  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }
  get annualcost() {
    //연간 비용
    return this.monthlyCost * 12;
  }
}

class Department {
  constructor(name, staff) {
    this._name = name;
    this._staff = staff;
  }
  get staff() {
    return this._staff.slice();
  }
  get name() {
    return this._name;
  }

  get totalMonthlyCost() {
    //총 월간 비용
    return this.staff
      .map((e) => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }
  get headCount() {
    return this, staff.length;
  }
  get totalAnnualCost() {
    //총 연간 비용
    return this.totalMonthlyCost;
  }
}

class Party {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
  get monthlyCost() {
    //월간 비용
    return this._monthlyCost;
  }
  get id() {
    return this._id;
  }

}

class Depatrment extends Party {
  constructor(name, staff) {
    super(name);
    this._name = name;
    this._staff = staff;
  }
  get staff() {
    return this._staff.slice();
  }
  get totalMonthlyCost() {
    //총 월간 비용
    return this.staff
      .map((e) => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }
  get headCount() {
    return this, staff.length;
  }
  get monthlyCost() {
    ...
  }
}
```
