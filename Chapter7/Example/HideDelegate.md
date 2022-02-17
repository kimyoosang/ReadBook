# 위임 숨기기

## Before

```javascript
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get department() {
    return this._department;
  }
  set department(arg) {
    this._department = arg;
  }
}

class Department {
  get chargeCode() {
    return this._chargeCode;
  }
  set chargeCode(arg) {
    this._chargeCode = arg;
  }
  get manager() {
    return this._manager;
  }
  set manager(arg) {
    this._manager = arg;
  }
}

//클라이언트:어떤 사람이 속한 부서의 관리자를 알고싶다고 하자. 클라이언트는 부서 클래스가 관리자 정보를 제공한다는 사실을 알아야 한다
manager = aPerson.deparment.manager;
```

## After

1. 클라이언트는 부서 클래스가 관리자 정보를 제공한다는 사실을 알아야한다. 이러한 의존성을 줄이려면 클라이언트가 부서 클래스를 볼 수 없게 숨기고, 대신 사람 클래스에 간단한 위임 메서드를 만들면 된다
2. 모든 클라이언트가 이 메서드를 사용하도록 고친다
3. 클라이언트 코드를 다 고쳤다면 사람 클래스의 department() 접근자를 삭제한다

```javascript
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get department() {
    return this._department;
  }
  set department(arg) {
    this._department = arg;
  }
  get manager() {
    return this._department.manager;
  }
}

class Department {
  get chargeCode() {
    return this._chargeCode;
  }
  set chargeCode(arg) {
    this._chargeCode = arg;
  }
  get manager() {
    return this._manager;
  }
  set manager(arg) {
    this._manager = arg;
  }
}

//클라이언트:어떤 사람이 속한 부서의 관리자를 알고싶다고 하자. 클라이언트는 부서 클래스가 관리자 정보를 제공한다는 사실을 알아야 한다
manager = aPerson.manager;
```
