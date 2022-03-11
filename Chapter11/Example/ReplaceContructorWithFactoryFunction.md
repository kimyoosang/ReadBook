# 생성자를 팩터리 함수로 바꾸기

## Before

- 직원 유형을 다루는 클래스

```javascript
class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }

  get name() {
    return this, _name;
  }
  get type() {
    return Employee.legelTypeCodes[this._typeCode];
  }
  static get legalTypeCodes() {
    return { E: "Engineer", M: "Manager", 5: "Salesperson" };
  }
}

//호출자 1
candidate = new Employee(document.name, document.empType);

//호출자 2
const leadEngineer = new Employee(document.leadEngineer, "E");
```

## After

1. 첫 번째로 할일은 팩터리 함수 만들기다. 팩터리 본문은 단순히 생성자에 위임하는 방식으로 구현한다
2. 그런 다음 생성자를 호출하는 곳을 찾아 수정한다. 한번에 하나씩, 생성자 대신 팩터리 함수를 사용하게 바꾼다
3. 두 번째 코드를 바꿀때는 함수에 문자열 리터럴을 건네는 방식이 아닌, 직원 유형을 팩터리 함수에 녹이는 방식으로 구현한다

```javascript
class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }

  get name() {
    return this, _name;
  }
  get type() {
    return Employee.legelTypeCodes[this._typeCode];
  }
  static get legalTypeCodes() {
    return { E: "Engineer", M: "Manager", 5: "Salesperson" };
  }
}
function createEmployee(name, typeCode) {
  return new Employee(name, typeCode);
}
//호출자 1
candidate = createEmployee(document.name, document.empType);

//호출자 2
function createEngineer(name) {
  return new Employee(name, "E");
}
```
