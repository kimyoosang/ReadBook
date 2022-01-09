import PLAYS from './plays.json'
import INVOICES from './invoices.json'


//청구 내역을 HTML으로 출력하는데, 연극 장르와 공연료 정책이 바뀔 때마다 기존 함수와 HTML 버전 함수를
//모두 수정해야 하기 때문에 이러한 불편함을 제거하기 위해 리팩토링 한다

//1.긴 함수를 리팩터링 할 때는 먼저 전체동작을 각각의 부분으로 나눌 수 있는 지점을 찾는다. 그러면 중간 즈음의 switch문이 가장 먼저 눈에 띄인다
//switch문은 공연에 대한 요금을 계산하고 있는데 이를 함수로 추출한다. 값이 변경되지 않는 perf,play는 매개변수로,계산 되는 값인 thismount를 반환하도록 한다

//2.하는 일을 명확히 나타내기 위해 play=>playfor(aperformance)라는 함수의 반환값으로

//3.volumeCredits는 반복문을 돌 때마다 값을 누적해야 함으로 새로운 함수를 만들어서 volumeCredits의 복제본을 초기화한뒤 계산 결과를 반환한다
//그리고 나서 새로 만든 함수에서 쓰이는 변수들 이름을 적절히 바꾼다

//4.임시변수는 자신이 속한 루틴에서만 의미가 있어서 루틴이 길고 복잡해지기 쉽다. 따라서 format을 함수로 만들어 반환값을 사용하한다
//함수의 이름은 화폐 단위를 맞추는 기능을 하기 때문에 usd(미국 화폐 단위)로 작명한다

//5.totalAmounts로 3과같은 방법으로 리팩토링한다

function statement(invoice, plays) { 
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명:${invoice.customer}) \n`;
  const format = new Intl.NumberFormat("en-Us", {
    style: "currency", currency: "USD",
    minimumFractionDigits: 2
  }).format; //4

  for (let perf of invoice.performances) {
    const play = plays[perf.playId]; //2
    let thisAmount = 0;
    //1
    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) thisAmount += 1000 * (perf.audience - 30);
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) thisAmount += 1000 + 500 * (perf.audience - 20);
        break;
      default:
        throw new Error(`알 수 없는 장르" ${play.type}`);
    }

    volumeCredits += Math.max(perf.audience - 30, 0);//3

    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    result += `${play.name}: ${format(thisAmount / 100)} (${perf.audience}석) \n`;
    totalAmount += thisAmount; //5
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result
}