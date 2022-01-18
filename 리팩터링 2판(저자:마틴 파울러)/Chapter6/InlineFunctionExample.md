# 1

## Before

```javascript
function rating(aDriver) {
  return moreThanFiveLateDelivers(aDriver) ? 2 : 1;
}

function moreThanFiveLateDelivers(aDriver) {
  return aDriver.numberOfLateDelivers > 5;
}
```

## After

- 호출되는 함수의 반환문을 그대로 복사해서 호출하는 함수의 호출문을 덮어쓰면 끝이다

```javascript
function rating(aDriver) {
  return aDriver.numberOfLateDelivers > 5 ? 2 : 1;
}
```

# 2

## Before

```javascript
function reportLines(aCustomer) {
  const lines = [];
  gatherCustomerData(lines, aCustomer);
  return lines;
}

function gatherCustomer(out, aCustomer) {
  out.push(["name", aCustomer.name]);
  out.push(["location", aCutomer.location]);
}
```

## After

- 여러 문장을 호출한 곳으로 옮기기를 사용해서 첫 문장부터 차례대로 옮긴다

```javascript
function reportLines(aCustomer) {
  const lines = [];
  line.push(["name", aCustomer.name]); // 1
  line.push(["location", aCutomer.location]); //2
  return lines;
}
```
