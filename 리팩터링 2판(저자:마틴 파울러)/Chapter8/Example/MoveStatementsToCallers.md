# 문장을 호출한 곳으로 옮기기

## Before

```javascript
function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`);
  renderPhoto(outStream, person.photo);
  emitPhotoData(outStream, person.photo);
}

function listRecentPhotos(outStream, photos) {
  photos
    .filter((p) => p.date > recentDataCutoff())
    .forEach((p) => {
      outStream.write("<div>\n");
      emitPhotoData(outStream, p);
      outStream.wirte("</div>\n");
    });
}

function emitPhotoData(outStream, photo) {
  outStream.wirte(`<p>제목: ${photo.title}</p>\n`);
  outStream.write(`<p>위치: ${photo.date.toDateString()}</p>\n`);
  outStream.write(`<p>날짜: ${photo.location}</p>\n`);
}
```

## After

- renderPerson()은 그대로 둔 채 listRecentPhotos()가 위치 정보(location)를 다르게 렌더링 하도록 만들어야 한다고 해보자

1. emitPhotoData()에 남길 코드를 함수로 추출한다
2. 피호출 함수를 호출자들로 한 번에 하나씩 인라인한다
3. 호출이 올바로 작동하는지 테스트한 후 다음 함수에도 인라인 한다
4. 원래 함수를 지워 함수 인라인하기를 마무리한다
5. zztmp()의 이름을 원래 함수의 이름으로 되돌린다

```javascript
function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`);
  renderPhoto(outStream, person.photo);
  zztmp(outStream, person.photo);
  outStream.write(`<p>위치: ${person.photo.location}</p>\n`);
}

function listRecentPhotos(outStream, photos) {
  photos
    .filter((p) => p.date > recentDataCutoff())
    .forEach((p) => {
      outStream.write("<div>\n");
      zztmp(outStream, p);
      outStream.write(`<p>위치: ${p.location}</p>\n`);
      outStream.wirte("</div>\n");
    });
}

function emitPhotoData(outStream, photo) {
  outStream.wirte(`<p>제목: ${photo.title}</p>\n`);
  outStream.write(`<p>날짜: ${photo.location}</p>\n`);
}
```
