# 1. 간단한 레코드 캡슐화하기

## Before

```javascript
//상수
const organization = {name: "애크미 구스베리", country: "GB"}

//읽고 쓰기
result += ``<h1>${organization.name}</h1>;
organization.name = newName;

```

## After

1. 상수를 캡슐화하기
2. 레코드를 클래스로 바꾸고, 새 클래스의 인스턴스를 반환하는 함수를 새로 만든다
3. 객체를 만드는 작업이 끝났으면, 레코드를 갱신하던 코드는 모두 세터를 사용하도록 고친다
4. 마찬가지로, 레코드를 읽는 코드는 모두 게터를 사용하게 바꾼다
5. 마지막으로 \_data의 필드들을 객체 안엥 바로 펼쳐놓으면 더 깔끔하다

```javascript
//Organization 클래스
class Organization {
  constructor(datat) {
    this._data = data;
    this._country = data.country
  }
  set name(aString) {this._data.name = aString};
  get name() {return this._data.name};
  get country()  {return this._country};
  set country(aCountryCode) {this._country = aCountryCode};

}

//최상위
const organization = new Organization({name: "애크미 구스베리", country: "GB"})
function getOrganization() {return organization;}

//클라이언트
getRawdataOfOrganization().name = newName;
result += ``<h1>${getOrganization().name}</h1>;

```

# 2. 중첩된 레콬드 캡슐화하기

JSON 문서처럼 여러겹 중첩된 레코드를 캡슐화하기

```javascript

//고객 정보를 저장한 해시 맵, 고객 ID를 키로 사용
 "1920": {
   name: "마틴 파울러",
   id: "1920",
   usages: {
     "2016": {
       "1": 50,
       "2": 55,
       //나머지 달(month)은 생략
     },
     "2015": {
       "1": 70,
       "2": 63,
       //나머지 달은 생략
     }
   }
 },
 "38673": {
   name: "닐 포드",
   id: "38673",
   //다른 고객 정보도 같은 형식으로 저장된다
 }

 //쓰기 예...
 customerData[customerID].usages[year][month] = amount;

 //읽기 예...
 function compareUsage (customerID, laterYear, month) {
   const later = customerData[customerID].usages[laterYear][month]
   const earlier = customerData[customerID].usages[laterYear - 1][month]
   return {laterAmount: later, change: later - earlier}
 }

```

## After

1. 캡술화 부터 시작한다
2. 전체 데이터 구조를 표현하는 클래스를 정의하고, 이를 반환하는 함수를 새로 만든다
3. 현재 고객 객체에는 이 값을 쓰는 세터가 없어서 데이터 구조 안으로 깊이 들ㄹ어가서 값을 바꾸고 있다. 따라서 데이터 구조 안으로 들어가는 코드를 세터로 뽑아내는 작업부터 한다
4. 그런 다음 이 함수를 고객 데이터 클래스로 옮긴다
5. 이렇게 쓰는 부분을 찾아 수정하다 보면 빠진 건 없는지 궁금해질 것이다. 확인하는 방법은 여러가지인데, getRawDataOfCustomer()에서 데이터를 깊은 복사하여 반환하는 방법이 있다. 테스트 커버리지가 충분하다면 깜빡 잊고 수정하지 않은 부분응ㄹ 테스트가 걸러내줄 것ㅅ이다

```javascript

//고객 정보를 저장한 해시 맵, 고객 ID를 키로 사용
 "1920": {
   name: "마틴 파울러",
   id: "1920",
   usages: {
     "2016": {
       "1": 50,
       "2": 55,
       //나머지 달(month)은 생략
     },
     "2015": {
       "1": 70,
       "2": 63,
       //나머지 달은 생략
     }
   }
 },
 "38673": {
   name: "닐 포드",
   id: "38673",
   //다른 고객 정보도 같은 형식으로 저장된다
 }

//전체 데이터 구조를 표현하는 클래스
 class CustomerData {
   constructor(data) {
     this._data = data;
   }
   setUsage(customerID, year, month, amount) {
     this._data[custoemrID].usages[year][month] = amount;
   }
   get rawData() {
     return _.cloneDeep(this._data);
   }
 }
 //최상위
 function getCustomerData() {return customerData;}
 function getRawDataOfcustomer() {return customerData._data;}
 function setRawDataOfCustomer(arg) {customerData = new CustomerData(arg);}

 //읽기 예...
 function compareUsage (customerID, laterYear, month) {
   const later = getRawDataOfCustomer()[customerID].usages[laterYear][month]
   const earlier = cgetRawDataOfCustomer()[customerID].usages[laterYear - 1][month]
   return {laterAmount: later, change: later - earlier}
 }
  //쓰기 예...
 getCustomerData().setUsage(customerID, year, month, amount)

```
