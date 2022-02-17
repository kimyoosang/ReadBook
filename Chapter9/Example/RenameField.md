# 필드 이름 바꾸기

## Before

```javascript
const organization = { name: "애크미 구스베리", country: "GB" };
```

## After

- name을 title로 바꾸고 싶다고 가정한다

1. 우선 origanization 레코드를 클래스로 캡슐화 한다
2. 별도의 필드를 정의하고 생성자와 접근자에서 둘을 구분해 사용한다
3. 생성자에서 title도 받아들일 수 있도록 조치한다
4. 이제 이 생성자를 호출하는 곳을 모두 찾아서 새로운 이름인 title을 사용하도록 하나씩 수정한다
5. 모두 수정했다면 생성자에서 name을 사용할 수 있게 하던 코드를 제거한다
6. 이제 생성자와 데이터가 새로운 이름을 사용하게 되었으니 접근자도 수정할 수 있게 되었다. 접근자 각각의 이름을 바꿔주면 된다

```javascript
class Organization {
  constructor(data) {
    this._title = data.title;
    this._country = data.country;
  }
  get title() {
    return this._title;
  }
  set title(aString) {
    this._title = aString;
  }
  get country() {
    return this._country;
  }
  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}
const organization = { title: "애크미 구스베리", country: "GB" };
```
