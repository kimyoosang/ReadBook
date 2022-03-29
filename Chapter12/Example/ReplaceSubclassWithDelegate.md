# 서브클래스를 위임으로 바꾸기 (서브 클래스가 하나일 때)

## Before

- 공연 예약 클래스
- 추가 비용을 다양하게 설정할 수 있는 프리미엄 예약용 서브클래스

```javascript
class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }
  get hasTalkback() {
    return this._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }
  get basePrice() {
    let result = this._show.price;
    if (this.isPeaDay) {
      result += Math.round(result * 0.15);
      return result;
    }
  }
}

class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);
    this._extras = extras;
  }
  get hasTalkback() {
    return this._show.hasOwnProperty("talkback");
  }
  get basePrice() {
    return Math.round(super.basePrice * this, _extras.premiumFee);
  }
  get hasDinner() {
    return this._extras.hasOwnProperty("dinner") && this.isPeakDay;
  }
}
```

## After

- 상속은 한 번만 사용할 수 있는 도구다. 따라서 상속을 사용해야 할 다른 이유가 생긴다면, 그리고 그 이유가 프리미엄 예약 서브클래스보다 가치가 크다고 생각되다면 프리미엄 예약을 (상속이 아닌) 다른 방식으로 표현해야 한다. 또한, 기본 예약에서 프리미엄 예약으로 동적으로 전환할 수 있도록 해야할 수도 있다
- 이러한 요구가 커지면 서브클래스를 위임으로 바꾸는게 좋다

1. 생성자를 팩터리 함수로 바꿔서 생성자 호출 부분을 캡슐화한다
2. 위임 클래스를 만들고 위임 클래스의 생성자는 서브클래스가 사용하던 매개변수와 예약 객체로의 역참조를 매개변수로 받는다. 역참조가 필요한 이유는 서브클래스 메서드 중 슈퍼클래스에 저장된 데이터를 사용하는 경우가 있기 때문이다
3. 이제 새로운 위임을 예약 객체와 연결한다. 프리미엄 예약을 생성하는 팩터리 함수를 수정하면 된다
4. 기능을 옮긴다. 먼저 hasTalkback()의 오버라이즈 메서드다
5. 함수 옮기기를 적용해 서브클래스의 메서드를 위임으로 옮긴다. 새 보금자에서도 잘 동작하도록 하기 위해 슈퍼클래스의 데이터를 사용하는 부분은 모두 \_host를 통하도록 고친다
6. 모든 기능이 잘 동작하는지 테스트 후 서브클래스의 메서드를 삭제한다
7. 위임이 존재하면 위임을 사용하는 분배 로직을 슈퍼클래스 메서드에 추가하고, 이것을 끝으로 이번 메서드 옮기기를 마무리 한다
8. 다음은 기본 가격이다. 서브클래스 코드를 위임으로 옮기려면 부모의 코드를 호출해야 하지만, 단순히 this.\_host.\_basePrice라고 쓰면 무한 재귀에 빠지고 만다.
   이를 해결하기 위해 위임의 메서드를 기반 메서드의 확장 형태로 재호출한다
9. 서브클래스에만 존재하는 메서드도 위임으로 옮긴다. 그런 다음 Booking에 분배 로직을 추갛나다
10. 서브클래스의 동작을 모두 옮겼다면 팩터리 메서드가 슈퍼클래스를 반환하도록 수정한다
11. 그리고 모든 기능이 잘 동작하는지 테스트한다음 서브클래스를 삭제한다

```javascript
function createBooking(show, date) {
  return new Booking(show, date);
}
function ceatePremiumBooking(show, date, extras) {
  const result = new Booking(show, date, extras);
  result._bePremium(extras);
  return result;
}

//클라이언트(일반 예약)
aBooking = createBooking(show, date);

//클라이언트(프리미엄 예약)
aBooking = createPremiumBooking(show, date, extras);

class PremiumBookingDelegate {
  constructor(hostBooking, extras) {
    this._host = hostBooking;
    this._extras = extras;
  }
  get hasTalkback() {
    return this._host._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }
  extenBasePrice(base) {
    return Math.round(base + this.extras.premiumFee);
  }
  get hasDinner() {
    return this._extras.hasOwnProperty("dinner") && this._host.isPeakDay;
  }
}

class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }
  get hasTalkback() {
    return this._premiumDelegate
      ? this._premiumDelegate.hasTalkback
      : this._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }
  get basePrice() {
    let result = this._show.price;
    if (this.isPeaDay) {
      result += Math.round(result * 0.15);
      return this._premiumDelegate
        ? this._premiumDelegate.extendBasePrice(result)
        : result;
    }
  }
  _bePremium(extras) {
    this.premiumDelegate = new PremiumBookingDelegate(this, extras);
  }
  get hasDinner() {
    return this._premiumDelegate ? this._premiumDelegate.hasDinner : undefined;
  }
}
```

- 상속은 이 상황을 잘 다루고 있는 데 반해, 위임을 적용하면 분배 로직과 양방향 참조가 더해지는 등 복잡도가 높아진다. 그래도 이 리팩터링이 가치있을 수 있는 이유는 동적으로 프리미엄 예약으로 바꿀 수 있다는 장점과, 상속은 다른 목적으로 사용할 수 있게 되었다는 점이다
- 이 장점이 상속을 없애는 단점보다 클 수 있다
