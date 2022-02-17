# 중개자 제거하기

## Before

```javascript
class Person {
  constructor(name) {
    this._name = name;
  }
  get manager() {
    return this._department.manager;
  }
}

class Department {
  get manager() {
    return this._manager;
  }
}

//클라이언트
manager = aPerson.manager;
```

## After

- 위임 메서드가 많아지면 사람 클래스의 상당 부분이 그저 위임하는 데만 쓰일 것이다. 그럴 떄는 중개자를 제거하는 편이 낫다

1. 먼저 위임 객체(부서)를 얻는 게터를 만든다
2. 이제 각 클라이언트가 부서 객체를 직접 사용하도록 고친다
3. 클라이언트를 모두 고쳤다면 Person의 managet() 메서드를 삭제한다. Person에 단순한 위임 메서드가 더는 남지 않을 때까지 이 작업을 반복한다

```javascript
class Person {
  constructor(name) {
    this._name = name;
  }
  get manager() {
    return this._department.manager;
  }
  get department() {
    return this._department;
  }
}

class Department {
  get manager() {
    return this._manager;
  }
}

//클라이언트
manager = aPerson.department.manager;
```
