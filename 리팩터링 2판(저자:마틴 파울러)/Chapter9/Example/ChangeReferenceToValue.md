# 참조를 값으로 바꾸기

## Before

- 사람 객체가 있고, 이 객체는 다음 코드처럼 생성 시점에는 전화번확 올바로 설정되지 못하게 짜여있다고 가정한다

```javascript
class person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  set officeAreaCode(arg) {
    this._telephonenumber.areaCode = arg;
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
  set officeNumber(arg) {
    this._telephoneNumber.number = arg;
  }
}
class TelephoneNumber {
  get areaCode() {
    return this.areaCode;
  }
  set areaCode(arg) {
    this._areaCode = arg;
  }
  get number() {
    return this._number;
  }
  set number(arg) {
    this._number = arg;
  }
}
```

## After

- 새 클래스를 가리키는 참조가 하나뿐이므로 참조를 값으로 바꾸기에 좋은 상황이다

1. 전화번호를 불변으로 만든다
2. 필드들의 세터들만 제거한다
3. 세터 제거의 첫 단계로, 세터로 설정하던 두 필드를 생성자에서 입력받아 설정하도록 한다
4. 세터를 호춣하는 쪽을 살펴서 전화번호를 매번 다시 대입하도록 바꿔야한다. 지역 코드부터 바꾼다
5. 나머지 필드들도 같은 작업을 해준다
6. 이제 전화번호는 불변이 되었으니 진짜 값이 될 준비가 끝났다. 동치성을 비교하기 위해 equals 메서드를 직접 작성한다
7. 테스트한다

```javascript
class person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  set officeAreaCode(arg) {
    this._telephonenumber = new TelephoneNumber(arg, this.officeNumber);
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
  set officeNumber(arg) {
    this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
  }
}
class TelephoneNumber {
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }
  get areaCode() {
    return this.areaCode;
  }
  set areaCode(arg) {
    this._areaCode = arg;
  }
  get number() {
    return this._number;
  }
  set number(arg) {
    this._number = arg;
  }
  equals(other) {
    if (!(other instanceof TelephoneNumber)) return false;
    return this.areaCode === other.areaCode && this.number === other.number;
  }
}
```
