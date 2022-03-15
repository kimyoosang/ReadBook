# 함수를 명령으로 바꾸기

## Before

- 건강보험 애플리케이션에서 사용하는 점수 계산 함수

```javascript
function score(candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
  let highMedicalRiskFlag = false;

  if (medicalExam.inSmoker) {
    healthLevel += 10;
    highMedicalRiskFlas = true;
  }
  let certificationGrade = "regular";
  if (scoringGuide.stateWithLowCertification(candidate.originState)) {
    certificationGrade = "low";
    result -= 5;
  }
  //비슷한 코드가 한참 이어짐
  result -= Math.max(healthLevel - 5, 0);
  return result;
}
```

## After

1. 빈클래스를 만든다
2. 이 함수를 그 클래스로 옮긴다
3. 매개변수를 하나씩 전부 옮긴다

```javascript
function score(candidate, medicalExam, scoringGuide) {
  return new Scorer(candidate, medicalExam, scoringGuide);
}

class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }
  execute(candidate, medicalExam, scoringGuide) {
    let result = 0;
    let healthLevel = 0;
    let highMedicalRiskFlag = false;

    if (this._medicalExam.inSmoker) {
      healthLevel += 10;
      highMedicalRiskFlas = true;
    }
    let certificationGrade = "regular";
    if (this._scoringGuide.stateWithLowCertification(candidate.originState)) {
      certificationGrade = "low";
      result -= 5;
    }
    //비슷한 코드가 한참 이어짐
    result -= Math.max(healthLevel - 5, 0);
    return result;
  }
}
```
