# 특이 케이스 추가하기

## Before

- 전력 회사는 전력이 필요한 현장에 인프라를 설치해 서비스를 제공한다
- 객체 리터럴 이용하기

1. 고객에 inUnknown()속성을 추가하여 미확인고객을 확인한다
2. 이 필드를 포함하는 특이케이스 객체를 생성한다
3. 특이 케이스 조건 검사 부분을 함수로 추출한다
4. 조건을 검사하는 코드와 Site 클래스에서 이 특이 케이스를 이용하도록 수정한다
5. 각각의 표준 응답을 적절한 리터럴 값으로 대체한다
6. 비슷한 방법으로 납부 이력이 없다는 정보는 중첩 리터럴로 생성한다

```javascript
   class Site {
     get customer() {
       return (this_customer === '미확인 고객') ? createUnknownCustomer():this._customer
     }
   }
   function createUnknownCustomer() {
     return {
       isUnknown:true,
       name: '거주자',
       billingPlan: registry.billingPlans.basic,
       paymentHistory: {
         weeksDelinquentInLastYear:0
       }
     }
   }
   class Customer {
     get name() {...}
     get billingPlan() {...}
     set billingPlan(arg) {...}
     get patmentHistory() {...}
     get isUnknown() {return false}
   }

function isUnknown(arg) {
  return arg.isUnknown
}
   //클라이언트 1
   const aCustomer = aCustomer.name
   // ...수많은 코드
   let customerName
   if(isUnknown(aCustomer)) customerName = '거주지'
   else customerName = aCustomer.name

   //클라이언트 2
   const plan = aCustomer.billingPlan

   //클라이언트 3
   const weeksDelinquent = aCustomer.paymanetHistory.weeksDelinquentInLastYear
```
