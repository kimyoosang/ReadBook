# 매개변수 객체 만들기

## Before

온도 측정가밧 배열에서 정상 작동 범위를 벗어난 것이 있는지 검사하는 코드

```javascript
//데이터
const station = {
  name: "ZIBI",
  readings: [
    { temp: 47, time: "2016-11-10 09:10" },
    { temp: 53, time: "2016-11-10 09:20" },
    { temp: 58, time: "2016-11-10 09:30" },
    { temp: 53, time: "2016-11-10 09:40" },
    { temp: 51, time: "2016-11-10 09:50" },
  ],
};
//정상 범위를 벗어난 측정값을 찾는 함수
function readingsOutsudeRange(station, min, max) {
  return station.readings.fiflter((r) => r.temp < min || r.temp > max);
}
//호출문
alerts = readingsOutsudeRange(
  station,
  operatingPlan.temperatureFloor,
  peratingPlan.temperatureCeiling
);
```

## After

1. 묶은 데이터를 표현하는 클래스 선언
2. 새로 만든 객체를 readingsOutsudeRange()의 매개변수로 추가하도록 함수 선언을 바꾼다
3. 온도 범위르 객체 형태로 전달하도록 호출문을 하나씩 바꾼다
4. 매개변수를 사용하는 부분을 변경한다. 최댓값,최소값
5. 쓰지않는 매개변수를 제거한다

```javascript
//데이터
const station = {
  name: "ZIBI",
  readings: [
    { temp: 47, time: "2016-11-10 09:10" },
    { temp: 53, time: "2016-11-10 09:20" },
    { temp: 58, time: "2016-11-10 09:30" },
    { temp: 53, time: "2016-11-10 09:40" },
    { temp: 51, time: "2016-11-10 09:50" },
  ],
};

class NumberRange {
  constructor(min, max) {
    this._data = { min: min, max: max };
  }
  get min() {
    return this._data.min;
  }
  get max() {
    return this._data.max;
  }
}

//정상 범위를 벗어난 측정값을 찾는 함수
function readingsOutsudeRange(station, range) {
  return station.readings.fiflter(
    (r) => r.temp < range.min || r.temp > range.max
  );
}

const range = new Nunmber(
  operatingPlan.temperatureFloor,
  peratingPlan.temperatureCeiling
);

//호출문
alerts = readingsOutsudeRange(station, range);
```
