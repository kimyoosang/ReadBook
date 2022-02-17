# 클래스 추출하기

## Before

```javascript
class Person {
  get name() {
    return this._name
  }
  set name(arg) {
    return this._name = arg;
  }
  get telephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }
  get officeAreCode() {
    return this._officeAreaCode;
  }
  set officeAreaCode(arg) {
    return this._officeAreaCode = arg;
  }
  get officeNumber() {
    return this._officeNumber;
  }
  set officeNumber(arg) {
    this._officeNumber = arg;
  }
```

## After

- 전화번호 관련 동작을 별도 클래스로 뽑는다

1. 빈 전화번호를 표현하는 TelephoneNumber 클래스를 정의한다
2. Person클래스의 인스턴스를 생성할 때 전화번호 인스턴스도 함께 생성해 저장해둔다
3. 필드들을 하나씩 새 클래스로 옮긴다
4. 테스트해서 문제없으면 다음 필드로 넘어간다
5. telephoneNumber()메서드를 옮긴다
6. 새로 만든 클래스는 순수한 전화번호를 뜻하므로 사무실(office)란 단어를 없애고 전화번호라는 뜻도 강조할 필요가 없으므로 메스드들의 이름을 적절히 바꿔준다
7. 마지막으로 전화번호를 사람이 읽기좋은 포맷으로 출력하는 역할도 전화번호 클래스에 맡긴다
8. 전화번호는 여러모로 쓸모가 많으니 이 클래스는 클라이언트에게 공개한다. 그러면 office 로 시작하는 메스드들을 없애고 TelephoneNumber의 접근자를 바로 사용하도록 바꾼다
9. 전화번호를 값 객체로 만드는게 나으니 참조를 값으로 바꾸기부터 적용한다

```javascript
class Person {
  costructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
  get name() {
    return this._name
  }
  set name(arg) {
    return this._name = arg;
  }
  get telephoneNumber() {
    return this._telephoneNumber.telephoneNumber;
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
  set officeNumber(arg) {
    return this._telephoneNumber.number = arg;
  }
  get officeAreCode() {
    return this._telephoneNumber.areacode;
  }
  set officeAreaCode(arg) {
    return this._telephoneNumber.areacode = arg;
  }


class Telephonenumber {
  get areaCode() {
    return this._areaCode;
  }
  set areaCode(arg) {
    this._areaCode = arg;
  }
  get number() {
  return this._onumber;
  }
  set number(arg) {
    this._number = arg;
  }
  get telephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }
  toString() {
    return `(${this.areaCode}) ${this.number}`;
  }
}

```
