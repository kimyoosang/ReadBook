# 질의 함수와 변경 함수 분리하기

## Before

- 이름 목록을 훑어 악당을 찾는 함수
- 악당을 찾으면 그 살마의 이름을 반환하고 경고를 울린다. 이 함수는 가장 먼저 찾은 악당만 취급한다

```javascript
function alertForMiscreant(people) {
  for (const p of people) {
    if (p === "조커") {
      setOffAlarms();
      return "조커";
    }
    if (p === "사루만") {
      setOffAlarms();
      return "사루만";
    }
  }
  return "";
}

//호출
const found = alertForMiscreant(people);
```

## After

1. 함수를 복제하고 질의 목적에 맞는 이름을 짓는다
2. 새 질의 함수에서 부수효과를 낳는 부분을 제거한다
3. 원래 함수를 호출하는 곳을 모두 찾아서 새로운 질의 함수를 호출하도록 바꾸고, 이어서 원래의 변경 함수를 호출하는 코드를 바로 아래에 삽입한다
4. 원래의 변경 함수에서 질의 관련 코드를 없앤다

```javascript
function alertForMiscreant(people) {
  for (const p of people) {
    if (p === "조커") {
      setOffAlarms();
      return;
    }
    if (p === "사루만") {
      setOffAlarms();
      return;
    }
  }
  return;
}

function findMiscreant(people) {
  for (const p of people) {
    if (p === "조커") {
      return "조커";
    }
    if (p === "사루만") {
      return "사루만";
    }
  }
  return "";
}
//호출
const found = findMiscreant(people);
alertForMiscreant(people);
```
