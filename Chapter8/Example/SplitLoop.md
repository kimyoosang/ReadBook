# 반복문 쪼개기

## Before

- 전체 급여와 가장 어린 나이를 계산하는 코드

```javascript
let youngest = people[0] ? people[0].age : Infinity;
let totalSalary = 0;
for (const p of people) {
  if (p.age < youngest) youngest = p.age;
  totalSalary += p.salary;
}
return `최연소: ${youngest}, 총 급여: ${totalSalary}`;
```

## After

1. 반복문을 복제한다
2. 복제했으면 잘못된 결과를 초래할 수 있는 중복을 제거한다

```javascript
let youngest = people[0] ? people[0].age : Infinity;
let totalSalary = 0;
for (const p of people) {
  totalSalary += p.salary;
}
for (const p of people) {
  if (p.age < youngest) youngest = p.age;
}
return `최연소: ${youngest}, 총 급여: ${totalSalary}`;
```
