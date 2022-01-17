# 1. 유효범위를 벗어나는 변수가 없을 때

## Before

```javascript

function prinOwing(invoice) {
  let outstanding = 0;

  console.log("*****************");
  console.log("**** 고객 채무 ****");
  console.log("*****************");

  //미해결 채무(outstanding)를 계산한다
  for(const o of invoice.orders) {
    outstanding += o.amount;
  }

  //마감일(dueDate)를 기록한다
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth()).
                             today.getDate() + 30);

  //세부 사항을 출력한다
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocalDateString()}`);
}

```

## After

1. 배너 출력로직 함수로 추출
2. 세부 사항 출력로직 함수로 추출

```javascript

function prinOwing(invoice) {
  let outstanding = 0;

  printBanner()

  //미해결 채무(outstanding)를 계산한다
  for(const o of invoice.orders) {
    outstanding += o.amount;
  }

  //마감일(dueDate)를 기록한다
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth()).
                             today.getDate() + 30);

  printDetail()

  function printBanner () {
    console.log("*****************");
    console.log("**** 고객 채무 ****");
    console.log("*****************");
  }

  function printDetail () {
    //세부 사항을 출력한다
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocalDateString()}`);
  }
}

```

# 2. 지역 변수의값을 변경할 때

## Before

```javascript
function printOwing(invoice) {
  let outstanding = 0;

  printBanner();

  //미해결 채무(outstanding)를 계산한다
  for (const o of invouice.orders) {
    outstanding += o.amount;
  }

  recoedDueDate(invoice);
  printDetails(invoice, outstanding);
}
```

## After

1. 선언문을 변수가 사용되는 코드 근처로 슬라이드한다
2. 그런 다음 추출할 부분을 새로운 함수로 복사한다
3. outstanding의 선언문을 추출할 코드 앞으로 옮겼기 때문에 매개변수로 전달하지 않아도 된다. 추출한 코드에서 값이 변경된 변수는 outstanding뿐이다. 따라서 이 값을 반환한다
4. 다음으로 넘어가서 추출한 코드의 원래 자리를 새로 뽑아낸 함수를 호출하는 문장으로 교체한다. 추출한 함수에서 새 값을 반환하니, 이 값을 원래 변수에 저장한다
5. 마지막으로 반환 값의 이름을 내 코딩 스타일에 맞게 바꾼다
   (calculateOustanding의 변수를 result로,원본 변수인 outstanding을 const를 붙여 불변으로)

```javascript
function printOwing(invoice) {
  printBanner();
  const outstanding = claculcateOutstanding(invoice);
  recoedDueDate(invoice);
  printDetails(invoice, outstanding);

  function claculateOutstanding(invoice) {
    let result = 0;
    for (const o of invouice.orders) {
      result += o.amount;
    }
    return result;
  }
}
```
