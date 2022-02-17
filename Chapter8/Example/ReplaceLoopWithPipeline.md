# 반복문을 파이프라인으로 바꾸기

## Before

```javascript

//사무실 정보를 CSV형태로 정리한것
office, country, telephone
Chicago, USA, +1 312 373 1000
Beijing, China, +86 4008 900 505
Porto Alegre, Brazil, +55 51 3079 3550
Chennai, India, +91 44 600 44766

//인도에 자리한 사무실을 찾아서 도시명과 전화번호를 반환하는 함수
function acquireData(input){
  const lines = input.split("\n")
  let firstLine = true
  const result= []
  for(const line of lines) {
    if(firstLine) {
      firstLine = false
      continue
    }
    if(line.trim() === "") continue
    const record = line.split(",")
    if(record[1].trim() === "India"){
      result.push({city:record[0].trim(), phone: record[2].trim()})
    }
  }
  return result
}
```

## After

- 반복문을 컬렉션 파이프라인으로 바꾼다

1. 반복문에서 사용하는 컬렉션을 가리키는 별도 변수를 새로 만든다
2. 첫 if문은 CSV 데이터의 첫 줄을 건너뛰는 역할이다. slice()연산을 루프 변수에서 수행하고 반복문 안의 if문을 제거한다
3. 빈 줄 지우가(trim)를 filter연산으로 대체한다. map연산을 사용해 여러 줄자리 CSV 데이터를 문자열 배열로 반환한다
4. filter()연산을 수행하여 인도에 위치한 사무실 레코드를 뽑아낸다
5. map()을 사용해 결과 레코드를 생성한다
6. 파이프라인의 결과를 누적 변수에 대입해준다

```javascript

//사무실 정보를 CSV형태로 정리한것
office, country, telephone
Chicago, USA, +1 312 373 1000
Beijing, China, +86 4008 900 505
Porto Alegre, Brazil, +55 51 3079 3550
Chennai, India, +91 44 600 44766

//인도에 자리한 사무실을 찾아서 도시명과 전화번호를 반환하는 함수
function acquireData(input){
  const lines = input.split("\n")
  const result=  lines.slice(1).filter(line => line.trim() !== "").map(line => line.split(",")).filter(record => record[1].trim() === "India").map(record => ({city:record[0].trim(), phone: record[2].trim()}))
  }
  return result
}
```
