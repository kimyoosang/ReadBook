# 클래스 인라인하기

## Before

```javascript
//배송 추적 정보를 표현하는 클래스
class TrackingInformation {
  get shippingCompany() {
    return this._shippingCompany; //배송회사
  }
  set shippingCompany(arg) {
    this._shippingCompany = arg;
  }
  get trackingNumber() {
    return this._trackingNumber; //추적 번호
  }
  set trackingnumber(arg) {
    this._trackingNumber = arg;
  }
  get display() {
    return `${this.shippingCompany}" ${this.trackingNumber}`;
  }
}

//TrackingInformation 클래스는 이 배송 클래스의 일부처럼 사용된다
class Shipment {
  get tracking() {
    return this._trackinginformation.display;
  }
  get trackingInformation() {
    return this._trackinginformation;
  }
  set trackinginformation(aTrackingInformation) {
    this._trackinginformation = aTrackinginformation;
  }
}
//TrackingInformation의 메서드를 호출하는 코드
aShipment.trackinginformation.shippingCompany = request.vendor;
```

## After

1. 외부에서 직접 호출하는 TrackingInformation의 메스드들을 모조리 Shipment로 옮긴다. 먼저 Shipment에 위임 함수를 만들고, 클라이언트가 이를 호출하도록 수정한다
2. TrackingInformation의 모든 요소를 Shipment오 옮긴다
3. 다 옮겼다면 TrackginInformation 클래스를 삭제한다

```javascript
class Shipment {
  get trackingInfo() {
    return `${this.shippingCompany}" ${this.trackingNumber}`;
  }
  get trackingInformation() {
    return this._trackinginformation;
  }
  set trackinginformation(aTrackingInformation) {
    this._trackinginformation = aTrackinginformation;
  }
  get shippingCompany() {
    return this._trackingInformation.shippingCompany; //배송회사
  }
  set shippingCompany(arg) {
    this._trackingInformation.shippingCompany = arg;
  }
  get trackingNumber() {
    return this._trackingNumber; //추적 번호
  }
  set trackingnumber(arg) {
    this._trackingNumber = arg;
  }
}
//TrackingInformation의 메서드를 호출하는 코드
aShipment.shippingCompany = request.vendor;
```
