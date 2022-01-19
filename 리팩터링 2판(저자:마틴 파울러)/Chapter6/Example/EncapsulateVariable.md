# 1. 기본 예시

# Before

```javascript
//전역 변수에 중요한 데이터가 담겨있는 경우
let defaultOwner = { firstName: "마틴", lastName: "파울러" };
//참조하는 코드
spaceship.owner = defaultOwner;
//갱신하는 코드
defaultOwner = { firstName: "레베카", lastName: "파슨스" };
```

# After

1. 기본적인 캡슐화를 위해 가장 먼저 데이터를 읽고 쓰는 함수부터 정의한다
2. 그런 다음 defatulOwner를 참조하는 코드를 찾아서 방금 만든 게터 함수르 호출하도록 고친다. 대입문은 세터 함수로 바꾼다
3. 모든 참조를 수정했다면 변수의 가시 범위를 제한한다. 자바스크립트로 작성할 때는 변수와 접근자 메서드를 같은 파일로 옮기고 접근자만 노출시키면 된다

```javascript
//전역 변수에 중요한 데이터가 담겨있는 경우
let defaultOwner = { firstName: "마틴", lastName: "파울러" };

export function getDefaultOwner() {
  return defaultOwner;
}
export function setDefaultOwner(arg) {
  defaultOwner = arg;
}

//참조하는 코드
spaceship.owner = defaultOwner();
//갱신하는 코드
setDefaultOwner({ firstName: "레베카", lastName: "파슨스" });
```

# 2. 값 캡슐화 하기

변수 뿐 아니랄 변수에 담긴 내용으 변경하는 행위까지 제어할 수 있게 캡슐화 하고 싶을 때 사용

# Before

```javascript
let defaultOwner = { firstName: "마틴", lastName: "파울러" };

export function getDefaultOwner() {
  return defaultOwner;
}
export function setDefaultOwner(arg) {
  defaultOwner = arg;
}
```

## After

- 데이터 복제본을 반환하면 크랄이언트는 게터로 얻은 데이터를 변경할 수 있지만 원본에는 아무 영향을 주지 못한다

1. Objecct.assign 사용
2. new 메서드 사용

```javascript
//new 메서드 사용 예시

let defaultOwner = { firstName: "마틴", lastName: "파울러" };

export function getDefaultOwner() {
  return new Person(defaultOwner);
}
export function setDefaultOwner(arg) {
  defaultOwner = arg;
}

class Person {
  constructor(data) {
    this._lastName = data.lastName;
    this._firstName = data.firstName;
  }
  get lastName() {
    return this._lastName;
  }
  get firstName() {
    return this._firstName;
  }
  //다른 속성도 이런식으로 처리한다
}
```
