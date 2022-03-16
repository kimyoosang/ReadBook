# 메서드 올리기

## Before

- 두 서브클래스에서 같은 일을 수행하는 메서드를 찾았다

```javascript

//Employee 클래스(Party를 상속함)
get annualCost() {
  return this.monthlyCost * 12
}
//Department 클래스(Party를 상속함)
get totalAnnualCost() {
  return this.monthlyCost * 12
}

```

## After

1. 두 메서드에서 참조하는 monthlyCost()속성은 슈퍼클래스에는 정의되어 있지 않지만 두 서브클래스 모두에 존재한다. 지금은 동적 언어인 자바스크립트를 사용해서 괜찮다. 정적 언어였다면 슈퍼클래스인 Party에 추상 메서드를 정의해야 한다
2. 두 메서드의 이름이 다르므로 함수 선언 바꾸기로 이름을 통일한다
3. 서브클래스 중 하나의 메서드를 복사해 슈퍼클래스에 붙여넣는다
4. Employee에서 annualCost()를 제거한다
5. 테스트한다
6. Department에서도 제거한다

```javascript
//Party클래스
class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
```
