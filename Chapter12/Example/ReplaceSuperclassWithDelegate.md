# 슈퍼클래스를 위임으로 바꾸기

## Before

- 스크롤들의 상세정보는 이미 카탈로그로 분류돼 있었는데, 각 스크롤에는 ID 번호와 제목이 있었고, 그외 여러 가지 태그가 붙어있다
- 스크롤에는 장기 세척 이력이 필요했다. 그래서 카탈로그 아이템을 확장하여 세척 관련데이터를 추가해 사용하였다

```javascript
class CatalogItem {
  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tages = tags;
  }
  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  hasTag(arg) {
    return this._tags.includes(arg);
  }
}

class Scroll extends CatalogItem {
  constructor(id, title, tags, dateLastCleaned) {
    super(id, title, tsgs);
    this._lastCleande = dateLastCleaned;
  }
  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }
  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.untill(targetDate, ChronoUnit.DAYS);
  }
}
```

## After

- 흔한 모델링 실수다. 물리적인 스크롤과 논리적인 카탈로그 아이템에는 차이가 있다. 예컨데 석화병 치료법을 적어 놓은 스크롤은 사본이 여러 개임에도 카탈로그 아이템은 하나뿐이다
- 카탈로그 아이템을 스크롤의 슈퍼클래스로 사용한다면 이래에 이 코드를 읽는 프로그래머에게 혼란을 줄 터이니 좋은 모델이 아니다

1. 가장 먼저 SCroll에 카탈로그 아이템을 참조하는 속성을 만들고 슈퍼클래스의 인스턴스를 새로 하나 만들어 대입한다
2. 그런 다음 이 서브클래스에서 사용하는 슈퍼클래스의 동작 각각에 대응하는 전달 메서드를 만든다
3. 카탈로그 아이템과의 상속 관계를 끊는다

```javascript
class CatalogItem {
  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tages = tags;
  }
  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  hasTag(arg) {
    return this._tags.includes(arg);
  }
}

class Scroll {
  constructor(id, title, tags, dateLastCleaned) {
    this._lastCleande = dateLastCleaned;
    this._catalogItem = new CatalogItem(id, title, tags);
  }
  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }
  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.untill(targetDate, ChronoUnit.DAYS);
  }
  get id() {
    return this._catalogItem.id;
  }
  get title() {
    return this._catalogItem.title;
  }
  hasTags(aString) {
    return this._catalogItem.hasTag(aString);
  }
}
```
