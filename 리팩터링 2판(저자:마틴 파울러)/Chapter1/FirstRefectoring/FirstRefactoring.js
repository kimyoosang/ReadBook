import PLAYS from '../plays.json'
import INVOICES from '../invoices.json'


//statement()의 HTML 버전을 만드는 작업을 한다
//분리된 계산 함수들이 텍스트 버전인 statement()안에 중첩함수로 들어가있는 상태이기 때문에 단계 쪼개기를 통해서 statement()를 두 단계로 나눈다
//첫번째 단계는 statement()에 필요한 데이터를 처리하고, 두 번째 단계에서는 앞서 처리한 결과를 텍스트나 HTML로 표현한다
//다시말해 첫 번째 단계에서는 두 번째 단계로 전달할 중간 데이터 구조를 생성하는 것이다

//1. 두 번째 단계는 청구 내역을 출력하는 코드인데, 현재는 statement()의 본문 7줄이 전부 여기에 해당한다.이를 renderPlainText()함수로 만들어 분리한다
//고객정보,공연정보,연극제목을 모두 중간 데이터 구조에서 가져온다

//2.함수 옮기기를 사용하여 playFor(),amountFor(),적립포인트계산부분,총합을 구하는부분 모두 statement함수로 옮긴다

//3.Statement에 필요한 데이터 처리에 해당하는 코드를 모두 별도 함수로 빼낸다

//4.두 단계를 명확히 분리한뒤에는 각 코드를 별도 파일에 저장한다

function statement(invoice, plays) {
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  for (let perf of invoice.performance) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석\n)`;
  }
  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;

  //여기서부터 중첩함수 시작
  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performance) {
      result += amountFor(perf);
    }
    return result;
  }
  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performance) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
      {
        style: "currency", currency: "USD",
        minimumFractionDigits: 2
      }).format(aNumber / 100);
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playId];
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    return result;
  } // amountFor()끝
}// statement()끝