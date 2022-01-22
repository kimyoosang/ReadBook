# 컬렉션 캡슐화 하기

# Before

```javascript
//Person 클래스
class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  get name() {
    return this._name;
  }
  get courses() {
    return this._courses;
  }
  set courses(aList) {
    this._courses = aList;
  }
}

//Course클래스
class Course  {
  constructor(name, isAdvanced) {
    this._name = name
    this._isAdvanced = isAdvanced
  }
  get name() {
    return this._name;
    }
  get isAdvanced() {
    return this._isAdvanced;
    }

  //클라이언트
  const basicCourseNames = readBasicCourseNames(file.name)
  aPerson.courses = basicCourseNames.map(name => new Course(nama, false))

  for(const name of readBasicCourseNames(filename)) { //수업목록 직접 수정
    aPerson.courses.push(new Course(name, false))
  }
```

## After

- Before 코드는 세터를 이용해 수업 컬렉션을 통째롤 설정한 클라이언트는 누구든 이 컬렉션을 마음대롤 수정할 수 있다는 허점이 있다
- 필드를 참조하는 과정만 캡슐화 했을 뿐 필드에 담긴 내용은 캡슐화하지 않은게 원인이다

1. 클라이언트가 수업을 하나씩 추가하고 제거하는 메서드를 Person에 추가한다
2. 제거 메서드에서는 클라이언트가 컬렉션에 없는 원소를 제거하려 할 때 에러를 던지되, 호출자가 원하는 방식으로 처리할 여지를 남겨둔다
3. 그런 다음 컬렉션의 변경자를 집적 호추하던 코드를 모두 찾아서 방금 추가한 메서드를 사용하도록 바꾼다
4. 이렇게 개별 원소를 추가하고 제거하는 메서드를 제공하기 때문에 setCourses()를 사용할 일이 없어졌으니 제거한다
5. 이 메서드들을 사용하지 않고서는 아무도 목록을 변경할 수 없게 만들기 위해 복제본을 제공하게 만든다

```javascript

//Course클래스
class Course  {
  constructor(name, isAdvanced) {
    this._name = name
    this._isAdvanced = isAdvanced
  }
  get name() {
    return this._name;
    }
  get isAdvanced() {
    return this._isAdvanced;
    }

//Person 클래스
class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  get name() {
    return this._name;
  }
  get courses() {
    return this._courses.slice();
  }
  addCourse(aCourse) {
     this._courses.push(aCourse);
  }
  removeCourse(aCourse, fnIFAbsent = () => {throw new RangeError();}) {
    const index = this._courses.indexOf(aCourse);
    if(index === -1) {
      fnIFAbsent();
    }
    else {
      this._courses.splice(index,1);
    }
  }
}

//클라이언트
const basicCourseNames = readBasicCourseNames(file.name)
aPerson.courses = basicCourseNames.map(name => new Course(nama, false))

for(const name of readBasicCourseNames(filename)) {
  aPerson.addCourse.(new Course(name, false))
}
```
