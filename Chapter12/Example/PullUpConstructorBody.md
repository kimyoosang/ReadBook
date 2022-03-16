# 생성자 본문 올리기

## Before

```javascript

class Party {}

class Employee extends Party{
  constructor(name, id, monthlyCost) {
    super()
    this._id id
    this._name = name
    this,_monthlyCost = monthlyCost
  }
  //생략
}

class Department extends Party{
  constructor(name, staff) {
    super()
    this._name = name
    this._staff = staff
  }
  //생략
}

```

## After

- 여기서 공통 코드는 this.\_name이라는 이름 대입 부분이다

1. Employee에서 이 대입문을 슬라이드하여 super() 호출 바로 아래로 옮긴다
2. 테스트가 성공하면 이 공통 코드를 슈퍼클래스로 옮긴다. 이 코드가 생성자의 인수인 name을 참조하므로 이 인수를 슈퍼클래스 생성자에 매개변수로 건넨다
3. 테스트를 돌려 모두 통과하면 리팩터링이 끝난다

```javascript

class Party {
  constructor(name) {
    this._name = name
  }
}

class Employee extends Party{
  constructor(name, id, monthlyCost) {
    super()
    this._id id
    this,_monthlyCost = monthlyCost
  }
  //생략
}

class Department extends Party{
  constructor(name, staff) {
    super(name)
    this._name = name
    this._staff = staff
  }
  //생략
}

```
