//다형성을 활용해 계산 코드 재구성하기

//연극 장르를 추가하고 장르마다 공연료와 적립 포인트 계산법을 다르게 지정하도록 기능을 수정한다
//이전 amouuntFor()함수를 보면 연극 장르에 따라 계산 방식이 달라지는데, 이런 형태의 조건부 로직은 코드 수정 횟수가
//늘어날수록 골칫거리로 전락하기 쉽다
//조건부 로직을 명확한 구조로 보완하는 방법은 다양하지만, 여기서는 객체지향의 핵심 특성인 다형성을 활용한다
//이번 작업의 목표는 상속계층을 구성해서 희극 서브클래스와 비극 서브클래스가 각자의 구체적인 계산 로직을 정의하는 것이다
//호출하는 쪽에서는 다형성 버전의 공연료 계산 함수를 호출하기만 하면되고, 희극이냐 비극이냐에 따라 정확한 계산 로직을 연결하는 작업은 언어 차원에서 처리해준다

//1. 핵심은 각 공연의 정보를 중간 데이터 구조에 채워주는 이전에 작성한 enrichPerformance()함수이다
//현재 이 함수는 조건부 로직을 포함한 함수인 amountFor(),voliumeCreditsFor()를 호출한다
//이 두 함수를 공연료 계산기라는 클래스로 옮긴다

//2.공연료 계산기를 만들고 공연료계산,적립포인트계산함수들을 계산기로 옯긴다

//3.다형성을 지원하기 위해 서브클래스를 사용하도록 변경한다. 자바스크립트에서는 생성자가 서브클래스의 인스턴스를 반환할 수 없기 때문에
//생성자를 팩터리 함수를 바꾼다
//연극 장르들 중 일반적인 경우 기본으로 삼아 슈퍼클래스에 남겨두고, 장르마다 달라지는 부분은 필요할 때 오바리으다헥 만든다
//그래서 포인트 계산 방식이 조금 다른 희극 처리 로직을 해당 서브클래스로 내린다

//결과: 연극 장르별 계산 코드들을 함께 묶어두었기 때문에, 새로운 장르를 추가하려면 해당 장르의 서브클래스를 작성하고 생성함수인
//createPerformanceClaculator()에 추가하기만 하면 된다

import PLAYS from '../plays.json'
import INVOICES from '../invoices.json'

export default function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance) {//1
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);//얕은복사
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playId]
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reducd((total, p) => total + p.volumeCredits, 0);
  }

  function createPerformanceCalculator(aPerformance, aPlay) {
    switch (aPlay.type) {
      case "tragedy": return new TragedCalculator(aPerformance, aPlay);
      case "comedy": return new ComedyCalculator(aPerformance, aPlay);
      default:
        throw new Error(`알 수 없는 장르: ${aPlay.type}`);
    }
  }
}

class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
      this.performance = aPerformance;
      this.play = aPlay;
    }

    get amount() {
      throw new Error('subclass responsibility');
    }
  
  //일반적인 경우에 사용하는 포인트계산
    get volumeCredits() {
      return Math.max(this.performance.audience - 30, 0);
    }
}
  //비극을 계산하는 서브클래스
  class TragedCalculator extends PerformanceCalculator {
    get amount() {
      let result = 40000;
      if (this.performance.audience > 30) {
        result += 1000 * (this.performance.audience - 30);
      }
      return result;
    }
  }

  //희극을 계산하는 서브클래스
  class ComedyClaculator extends PerformanceCalculator {
    get amount() {
      let result = 30000;
      if (this.performance.audience > 20) {
        result += 1000 + 500 * (this.performance.audience - 20);
      }
      result += 300 * this.performance.audience;
      return result;
    }
    //슈퍼클래스에 있는 포인트계산법과 다르기 때문에 희극처리 로직을 오버라이딩
    get volumeCredits() {
      return super.volumeCredits + Math.floor(this.performance.audience / 5);
    }
  }
