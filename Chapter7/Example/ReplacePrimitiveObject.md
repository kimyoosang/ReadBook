# 1. 간단한 예시

## Before

데이터 구조에서 데이터를 읽어 들이는 단순한 주문 클래스. 이 클래스의 우선순위 속성은 값을 간단히 문자열로 표현한다

```javascript
///Order클래스
class Order {
  construcctor() {
    this._priority = data.priority;
    //나머지 초기화 코드 생략
  }
}
//클라이언트
highPriorityCount = orders.filter(0 => "high" === 0.priority || "rush" === o.priority.length;)
```

## After

1. 데이터 값을 다루기 전에 항상 변수부터 캡슐화한다
2. 이제 우선순위 속성을 초기화하는 생성자에서 방금 정의한 세터를 사용할 수 있다. 이렇게 필드를 자가 캡슐화하면 필드 일므을 바꿔도 클라이언트 코드는 유지할 수 있다
3. 다음으로 우선순위 속성을 표현하는 값 클래스 Priority를 만든다. 이 클래스는 표현할 값을 받는 생성자와 그 값을 문자열로 반환하는 변환 함수로 구성된다
4. 방금 만든 Priority 쿨랴수룰 사용하도록 접근자들을 수정한다
5. 이렇게 Priority 클래스를 만들고 나면 Order 클래스의 게터가 반환한는 값은 우선순위 자체가 아니라 우선순위를 표현하는 문자열이다. 즉시 함수 이름을 바꿔준다

```javascript

///Order클래스
class Order {
  construcctor() {
    this._priority = data.priority;
    //나머지 초기화 코드 생략
  }
  get priority() {
    return this._priority.toString();
    }
  get priority(aString) {
    this._priority = new Priority(aString);
    }
}
class Priority {
  constructor(value) {
    this._value = value;
  }
  toString() {
    return this._value;
    }
}
//클라이언트
highPriorityCount = orders.filter(0 => "high" === 0.priorityString || "rush" === o.priorityString.length;)

```

# 2. 더 가다듬기

## Before

```javascript

///Order클래스
class Order {
  construcctor() {
    this._priority = data.priority;
    //나머지 초기화 코드 생략
  }
  get priority() {
    return this._priority.toString();
    }
  get priority(aString) {
    this._priority = new Priority(aString);
    }
}
class Priority {
  constructor(value) {
    this._value = value;
  }
  toString() {
    return this._value;
    }
}
//클라이언트
highPriorityCount = orders.filter(0 => "high" === 0.priorityString || "rush" === o.priorityString.length;)

```

## After

Priority 객체를 제공하는 게터를 Order 클래스에 만든다

1. Priority 클래스는 다른 곳에서도 유용할 수 있으니 Order의 세터가 Priority 인스턴스를 받도록 한다
2. 이렇게 하는 목적은 어디까지나 Priority 클래스를 새로운 동작을 담는 장소로 활요하기 위해서다

```javascript

///Order클래스
class Order {
  construcctor() {
    this._priority = data.priority;
    //나머지 초기화 코드 생략
  }
  get priority() {
    return this._priority;
    }
  get priority() {
    return this._priority.toString();
    }
  get priority(aString) {
    this._priority = new Priority(aString);
    }
}
class Priority {
  constructor(value) {
    if(value instanceof Priority) {
      return value;
    }
    this._value = value;
  }
  toString() {
    return this._value;
    }
}
//클라이언트
highPriorityCount = orders.filter(0 => "high" === 0.priorityString || "rush" === o.priorityString.length;)

```
