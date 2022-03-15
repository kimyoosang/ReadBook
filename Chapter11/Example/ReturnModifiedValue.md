# 수정된 값 반환하기

- GPS 위치 목록으로 다양한 계산을 수행하는 코드

```javascript
let totalAscent = 0;
let totalTime = 0;
let totelDistance = 0;
calculateAscent();
calculateTime();
calculateDistance();
const pace = totalTime / 60 / totalDistance;

function calculateAscent() {
  for (let i = 1; i < points, length; i++) {
    const verticalChange = points[i].elevation - points[i - 1].elevation;
    totalAscent += verticalChange > 0 ? verticalChange : 0;
  }
}
```

## After

- 이 코드에서는 calculateAscent()안에서 totalAscent가 갱신된다는 사실이 드러나지 않으므로 calculateAscent()와 외부 환경이 어떻게 연결돼 있는지가 숨겨진다. 갱신 사실을 밖으로 알려보자

1. totalAscent값을 반환하고, 호출한곳에서 변수에 대입하게 고친다
2. 그런 다음 calculateAscent()안에 반환할 값을 담을 변수인 totalAscent를 선언한다. 그런데 이 결과 부모 코드에 있는 똑같은 이름의 변수가 가려진다
3. 이 문제를 피하기 위해 변수의 이름을 일반적은 명명 규칙에 맞게 수정한다
4. 그런 다음 이 계산이 변수 선언과 동시에 수행되도록 하고, 변수에 const를 붙여서 불변으로 만든다

```javascript
let totalAscent = 0;
let totalTime = 0;
let totelDistance = 0;
const totalAscent = calculateAscent();
calculateTime();
calculateDistance();
const pace = totalTime / 60 / totalDistance;

function calculateAscent() {
  let result = 0;
  for (let i = 1; i < points, length; i++) {
    const verticalChange = points[i].elevation - points[i - 1].elevation;
    result += verticalChange > 0 ? verticalChange : 0;
  }
  return result;
}
```
