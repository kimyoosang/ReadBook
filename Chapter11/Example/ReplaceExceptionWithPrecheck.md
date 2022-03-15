# 예외를 사전학인으로 바꾸기

- 데이터베이스 연결 같은 자원들을 관리하는 자원 풀 클래스

```java
// ResoucePool 클래스 (자바)
public Resouce get() {
  Resouce result
  try{
    result = available.pop()
    allocated.add(result)
  } catch (NoSuchElementException e) {
    result = Resouce.create()
    allocated.add(result)
  }
  return result
}

private Deque<Resouce> available
private List<Resouce> allocated
```

## After

- 풀에서 자원이 고갈되는 건 예상치 못한 조건이 아니므로 예외 처리로 대응하는 건 좋지 않다
- 사용하기 전에 allocated 컬렉션의 상태를 확인하는 것이 좋다

1. 조건을 검사하는 코드를 추가하고, catch 블록의 코드를 조건문의 조건절로 옮기고, 남은 try 블록 코드를 다른 조건절로 옮긴다
2. catch 절은 더 이상 호출되지 않으므로 어서션을 추가한다
3. 어서션까지 추가한 후 테스트에 통과하면 try 키워드와 catch 블록을 삭제한다
4. 한 번 더 테스트한다

```java
// ResoucePool 클래스 (자바)
public Resouce get() {
  Resouce result
  if(available.isEmpty()){
    result = Resouce.create()
    allocated.add(result)
  }
  else {
    result = available.pop()
    allocated.add(result)
  }
  return result
}

private Deque<Resouce> available
private List<Resouce> allocated

```
