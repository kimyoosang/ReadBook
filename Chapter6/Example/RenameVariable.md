# 1. 변수 이름 바꾸기 간단 예시

# Before

```javascript
let tpHd = "untitled";

//변수를 읽기만 하는 참조
result += `<h1>${tpHd}</h1>`;

//값을 수정하는 곳
tphd = obj["articleTitle"];
```

# After

1. 변수 캡슐화하기
2. 캡술화 이후에 변수 이름 바꾸기

```javascript
let _title = "untitled";

result += `<h1>${title()}</h1>`;

setTitle(obj["articletitle"]);

function title() {
  return _tpHd;
}
function setTitle() {
  _title_ = arg;
}
```

# 2. 상수 이륾 바꾸기

## Before

```javascript
const cpyNm = "애크미 구스베리";
```

## After

상수의 이름은 캡슐화하지 않고도 복제 방식으로 점진적으로 바꿀 수 있다

1. 원본의 이름을 바꾼 후, 원본의 원래이름과 같은 복제본으 만든다
2. 기본 이름(복제본)으 참조하는 코드들을 새 이륾으로 점진적으로바꾼다
3. 다 바꿨다면 복제본으 삭제한다

```javascript
const companyName = "애크미 구스베리";
const cpyNm = companyName;
```
