# 변수 쪼개기

## Before

- 입력 매개변수의 값을 수정할 때

```javascript
function discount(inputValue, qyantity) {
  if (inputValue > 50) {
    inputValue = inputValue - 2;
  }
  if (quantity > 100) {
    inputValue = inputValue - 2;
  }
  return inputValue;
}
```

## After

- inputValue는 (1)함수에 데이터를 전달하는 용도, (2)굘과를 호출자에 반환하는 용도로 쓰였다

1. inputValue를 쪼갠다
2. 쪼갠 다음 변수 이름 바꾸기를 수행해서 가각의 쓰임에 어올리는 이름을 지어준다

```javascript
function discount(originalInputValue, qyantity) {
  let result = inputValue;

  if (inputValue > 50) {
    result = result - 2;
  }
  if (quantity > 100) {
    result = result - 2;
  }
  return inputValue;
}
```
