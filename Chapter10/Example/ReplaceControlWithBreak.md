# 제어 플래그를 탈출문으로 바꾸기

## Before

- 사람 목록을 훑으면서 악당을 찾는 코드

```javascript
//생략(중요하지 않은 코드)
let found = false;
for (const p of people) {
  if (!found) {
    if (p === "조커") {
      sendAlert();
      found = true;
    }
    if (p === "사루만") {
      sendAlert();
      found = true;
    }
  }
}
//생략
```

## After

1. 여기서 제어 플래그는 found 변수이고, 제어 흐름을 변경하는데 쓰인다. 이처럼 정리해야 할 코드양이 제법 된다면 가장 먼저 함수 추출하기를 활용해서 서로 밀접한 코드만을 담은 함수를 뽑아내보자. 그러면 관련된 코드만 따로 떼어서 볼 수 있다
2. 제어 플래그가 참이면 반복문에서는 더 이상 할일이 없다. break 문으로 반복해서 벗어나거나 return 을 써서 함수에서 아예 빠져나오면 된다
3. 제어 플래그가 갱신되는 장소를 모두 찾아서 같은 과정을 반복한다
4. 갱신코드를 모두 제거했다면 제어 플래그를 참조하는 다른 코드도 모두 제거한다

```javascript
//생략(중요하지 않은 코드)
checkForMiscreants(people);
//생략
function checkForMiscrents(people) {
  for (const p of people) {
    if (p === "조커") {
      sendAlert();
      return;
    }
    if (p === "사루만") {
      sendAlert();
      return;
    }
  }
}
```
