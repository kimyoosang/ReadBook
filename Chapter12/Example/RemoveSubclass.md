# 서브클래스 제거하기

## Before

```javascript
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get genderCode() {
    return "X";
  }
}

class Male extends Person {
  get genderCode() {
    return "M";
  }
}
class Female extends Person {
  get genderCode() {
    return "F";
  }
}

//클라이언트...
const numberOfMales = people.filter((p) => p instanceof Male).length;
```

## After

1. 서브클래스 만들기를 캡슐화하는 방법은 바로 생성자를 팩터리 함수고 바꾸기다. 생성할 클래스를 선택하는 로직을 함수로 추출하고, 그 함수를 팩터리 함수로 삼는다
2. 이 팩터리가 서브클래스 생성을 캡슐화해주지만 코드의 다른 부분에서 instanceof를 사용하는 모습이 눈에 띈다. 이 타입 검사 코드를 함수로 추출한다. 그런다음 Person으로 옮긴다
3. 서브클래스들의 차이(성별)을 나타낼 필드를 추가한다. 성별 정보는 Person 클래스 외부에서 정해 전달하는 방식이니 생성자에서 매개변수로 받아 설정하도록 작성한다
4. 남성인 경우의 로직을 슈퍼클래스로 옮긴다. 이를 위해 팩터리는 Person을 반환하도록 수정하고 instanceof를 사용해 검사하던 코드는 성별 코드 필드를 이용하도록 수정한다
5. 테스트에 성공하면 남성 서브클래스를 제거한다
6. 테스트하여 성공하면 여성 서브클래스도 같은 방식으로 제거한다

```javascript
class Person {
  constructor(name) {
    this._name = name;
    this._genderCode = genderCode;
  }
  get name() {
    return this._name;
  }
  get genderCode() {
    return this._genderCode;
  }
  get isMale() {
    return "M" === this._genderCode;
  }
  get isFemail() {
    return "F" === this._genderCode;
  }
}

class Male extends Person {
  get genderCode() {
    return "M";
  }
}
class Female extends Person {
  get genderCode() {
    return "F";
  }
}

function createPerson(aRecord) {
  switch (aRecord.gender) {
    case "M":
      return new Male(aRecord.name, "M");
      break;
    case "F":
      return new Female(aRecord.name, "F");
      break;
    default:
      return new Person(aRecord.name);
  }
  return p;
}

function loadFromInput(data) {
  return data.map((aRecord) => {
    createPerson(aRecord);
  });
}

function isMale() {
  return this instanceof Male;
}

//클라이언트...
const numberOfMales = people.filter((p) => p.isMale).length;
```
