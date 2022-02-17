# 문장을 함수로 옮기기

## Before

- 사진관련 데이터를 HTML로 내보내는 코드

```javascript
function renderperson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderphoto(person.photo));
  result.push(`<p>제목: ${person.photh.title}</p>`);
  result.push(emitPhotoDataI(person.photo));
  return result.join("\n");
}

function photoDiv(p) {
  return ["<div>", `<p>제목: ${p.title}</p>`, emitPhotoData(p), "</div>"].join(
    "\n"
  );
}

function emitPhotoData(aPhoto) {
  const result = [];
  result.push(`<p>위치: ${aPhoto.location}</p>`);
  result.push(`<p>날짜: ${aPhoto.date.toDateString()}</p>`);
  return result.join("\n");
}
```

## After

- 총 두 곳에서 emitPhotoData()를 호출하며, 두 곳 모두 바로 앞에는 제목(title) 출력 코드가 나온다
- 제목을 출력하는 코드를 emitPhotoData()안으로 옮겨 이 중복을 없애보자

1. 가장 먼저 호출자 중 하나에 함수 추출하기를 적용한다. emitPhotoData()로 옮기려는 코드와 emitPhotoData()호출문을 함께 추출한다
2. 다른 호출자들을 하나씩 차례로 새로운 함수를 호출하도록 수정한더
3. 호출자들을 빠짐없이 수정했다면 emitPhotoData()함수를 인라인한다
4. 그리고 함수 이름을 바꿔 마무리 한다

```javascript
function renderperson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderphoto(person.photo));
  result.push(`<p>제목: ${person.photh.title}</p>`);
  result.push(emitPhotoData(person.photo));
  return result.join("\n");
}

function photoDiv(p) {
  return ["<div>", emitPhtoData(aPhoto), "</div>"].join("\n");
}
function emitPhotoData(aPhoto) {
  return [
    `<p>제목: ${p.title}</p>`,
    `<p>위치: ${aPhoto.location}</p>`,
    `<p>날짜: ${aPhoto.date.toDateString()}</p>`,
  ].join("\n");
}
```
