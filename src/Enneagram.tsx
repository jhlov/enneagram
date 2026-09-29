import axios from "axios";
import React, { useState } from "react";
import "./Enneagram.scss";
import EnneagramItem from "./EnneagramItem";

interface EnneagramProp {
  onSubmit: Function;
}

const Enneagram: React.FC<EnneagramProp> = ({ onSubmit }) => {
  const questionList = [
    "나는 사람들을 쉽게 믿지 않지만 한번 신뢰한 사람과는 관계를 오래 지속한다.",
    "나는 어떠한 일이든지 한가지 일을 싫증내지 않고 갈등없이 꾸준히 할 수 있다.",
    "나는 구성원간의 신뢰를 구축하고 자신의 직무에 충실하도록 하며 협동을 장려한다.",
    "나는 평화롭고 안정감이 있으며 둥글둥글한 사람이다.",
    "나는 회의나 워크샵보다 책이나 논문을 통해 깊이 있는 지식을 얻기를 원한다.",
    "나는 지름길을 찾기보다는 원칙을 지켜서 열심히 일하는 것을 선호한다.",
    "사람들은 나를 무던하고 편안한 사람으로 여긴다.",
    "나는 삶을 즐기는데 금전적인 지출을 많이 한다.",
    "나는 지나칠 정도로 내 자신의 일보다 다른 사람을 도와주는 일을 많이 한다.",
    "나는 일상적인 것에 무관심하며 독특한 것을 추구하기 때문에 주변 사람들에게 이해 받지 못할 때가 많다.",
    "나는 섭섭함이 있다고 하더라도 그 사람이 다시 관심을 보이면 쉽게 잊고 용서하는 경향이 있다.",
    "나는 민감하며 다른 사람들과 다르다",
    "나는 사람들 속에서 경험과 감정을 공유하면서 배울 때 가장 잘 배울 수 있다.",
    "나는 타인이 내 기대치에 미치지 못할 때 낙담하거나 화를 낸다.",
    "돈을 버는 것이 중요한 이유는 경제적인 성취가 나의 성공을 보여주는 척도이기 때문이다.",
    "나는 작은 일이라도 완벽하게 처리하려고 노력하기 때문에 시간이 늘 부족하다.",
    "나는 효율적이며 성공을 추구한다.",
    "나는 친한 사람이라도 예고없이 방문하면 반갑지 않다.",
    "나는 제한된 자원으로 목표를 달성하기 위해 효율을 중시하며 때로는 경쟁적이 되기도 한다.",
    "나는 거시적인 목표를 설정하고 차근차근 달성하는 대기만성 형이다.",
    "내가 필요하다고 느끼면 배우지만 대부분은 그럴 필요를 느끼지 못한다.",
    "나는 수입을 늘이기보다는 지출을 줄이는 것이 현명한 돈관리 방법이라고 생각한다.",
    "스트레스 상황에서 나는 자책과 후회를 하며 혹독하게 비판한다.",
    "스트레스 상황에서 나는 어딘가에 집중하고 몰입함으로써 벗어나려고 한다.",
    "나는 전문성을 확보하고 정보력을 바탕으로 조직을 관리한다.",
    "나는 지나치게 낙관적으로 생각하기 때문에 주변 사람들이 불안해 하는 경향이 있다.",
    "나는 대부분의 사람들이 선호하는 재테크 방법보다는 나만의 독특한 방식으로 돈을 벌고 싶다.",
    "나는 거시적인 안목을 갖고 일을 추진하며 모든 사람들의 의견을 받아들여 화합을 추구한다.",
    "나는 스트레스 상황에서 나만의 공간에 들어가서 조용한 시간을 가지며 깊은 생각에 잠긴다.",
    "나는 돈을 벌기 위해 한탕주의를 쫓는 것이 아니라 꾸준하고 성실하게 노력해야 한다고 생각한다.",
    "나는 감정적으로 끌리고 의미가 있다고 여겨지는 것을 위해서는 나 자신을 잃고 치열하게 몰입한다.",
    "나는 성공을 위한 자기개발이 아니면 의미가 없다고 느낀다.",
    "스트레스 상황에서 나는 우울해지며 우울을 즐기는 경향이 있다.",
    "나는 성공하기 위해서는 경쟁에서 이겨야 하기 때문에 인간관계가 악화되어도 어쩔 수 없다고 생각한다.",
    "나는 적극적으로 문제를 해결하기 보다는 시간이 지나서 문제가 저절로 해결되도록 내버려둔다.",
    "나는 직선적으로 단호한 입장을 취하다 보니 사람들과 충돌하기 쉽다.",
    "나는 다양한 정보를 수집하고 의견을 수렴하지만 상대방을 고려하지 않고 혼자 생각하고 결정한다.",
    "스트레스 상황에서 나는 사람들을 찾아가 도와주면서 잊으려 한다.",
    '나는 권위적이며 카리스마 넘치고 "불가능은 없다."의 정신을 강조한다.',
    "나는 부하직원과 동료들에게 관심을 갖고 배려하며 지원하는 리더쉽을 발휘한다.",
    "나는 내게 맡겨진 일을 다하기 전에는 휴식을 취하기 어렵다.",
    "나는 진정으로 나를 이해하는 사람들과 깊은 교류를 하는 반면 그렇지 않은 사람들에게는 마음을 닫는다.",
    "나는 주어진 시간표에 맞춰서 살기보다는 내가 시간을 통제하고 결정하고 싶다.",
    "나는 무미건조한 일에 시간을 사용하진 않지만 재미있는 일에는 얼마든지 시간을 쓸 수 있다.",
    "나는 단순한 한 가지 일을 할 때보다 여러 가지 일을 동시에 추진할 때 의욕이 더 생긴다.",
    "나는 가르치는 사람의 권위에 관심이 많으며 가르치는 사람이 믿을 만 할 때 학습효과가 높다.",
    "나는 자기개발을 위해 노력하지만 항상 스스로의 기준에 못 미친다고 생각한다.",
    "나는 내 감정을 직설적으로 표현해서 사람들에게 상처를 주기도 하지만 사실은 뒤끝이 없다.",
    "나는 다른 사람들이 생각하지 못하는 특별하고 독특한 아이디어로 조직을 이끈다.",
    "나는 사람들과 떨어진 공간에서 독립적으로 일할 때 효율이 더 오른다.",
    "나는 사람들이 필요로 하는 것을 잘 알고 있고 그것에 맞추기 때문에 사람들은 나를 좋아한다.",
    "나는 유능하고 성공적인 사람이 됨으로써 사람들이 나에게 끌려오도록 하고 싶다.",
    "나는 어려운 일에 부딪히면 내 능력을 발휘할 기회라고 생각이 들고 힘이 더 솟는다.",
    "나는 안정된 미래를 준비하는 것에 치중하다보니 삶을 즐기는데 지출을 별로 하지 않는 편이다.",
    "나는 모든 수단과 방법을 동원하여 생산성을 향상시킨다.",
    "나는 수평적이고 광범위한 인적 네트워크를 구축하며 즐겁게 일할 수 있는 분위기를 만든다.",
    "나는 돈에 대한 욕심이 없다는 소리를 듣는다.",
    "나는 효율적으로 시간을 관리해서 많은 성과를 내기보다는 나를 만족시켜주는 특별한 일에 시간을 쓰고 싶다.",
    "나는 도덕적이고 절도가 있으며 자제력이 있는 사람이다",
    "나는 돈을 벌어서 강한사람이 되어야 하고 그럴 자신이 충분히 있다.",
    "나는 타인을 위한 시간이나 사교적인 활동을 위해 보내는 시간이 불편하다.",
    "나는 문제점을 잘 파악하고 대비를 잘 하는 사람이다.",
    "나는 나를 위한 시간이 부족해도 타인을 위해서라면 시간을 낼 수 있다.",
    "나는 단위 시간 안에 가장 효율적으로 일을 처리하는 방법을 알고 있다.",
    "나는 소수의 사람들과 깊은 관계를 맺는것보다 많은 사람들을 만나 즐기는 것을 좋아한다.",
    "스트레스 상황에서 나는 화가 나거나 심한 압박감을 느끼며 긴장하고 예상치 않은 행동을 한다.",
    "나는 대부분의 경우 상대방에게 동의하지만 그렇지 않을 경우에는 반대를 표현하지 않고 내 마음대로 한다.",
    "나는 동료나 부하의 잘못을 지적하고 개혁 지향적이며 완벽을 추구한다.",
    "나는 익숙한 하루일과에 갑작스러운 변화가 일어나는 것을 좋아하지 않는다.",
    "나는 다른 사람을 도와주지 못하면 스스로 가치 없는 인간으로 느낀다.",
    "나는 사람들과 어울리기 보다는 혼자 있는 것을 좋아한다.",
    "나는 지나치게 조심스러워 일이 지연되기 때문에 주변사람들을 답답하게 한다.",
    "나는 고통을 회피하는 방법으로 즐겁고 재미있는 일을 추구하는 경향이 많다.",
    "나는 독특한 분위기에서 일의 성과를 더 잘 낼 수 있다.",
    "나는 일의 성과에 대한 기대수준이 높으며 사람들을 감시하고 지시하기 때문에 대인관계에서 갈등을 경험한다.",
    "나는 업무범위와 일처리 방식을 명확하게 지시받았을 때 임무와 역할을 잘 수행할 수 있다.",
    "나는 새로운 자기개발 프로그램에 대한 정보를 들으면 꼭 가보고 싶은 충동이 일어난다.",
    "내가 돈을 벌고 싶어하는 중요한 이유는 사람들에게 베풀고 도움을 주고 싶어서이다.",
    "나는 스스로가 강하다고 생각하기 때문에 쉽게 스트레스 받지 않는다.",
    "나는 다재다능한 낙천주의자이다.",
    "나는 내 주장이 강하고 자신감이 있는 사람이다."
  ];

  const COUNT_PER_PAGE = 9;
  const TOTAL_PAGE = Math.floor(questionList.length / 9);

  const [curPage, setCurPage] = useState<number>(0);
  const [curCount, setCurCount] = useState<number>(1);
  const [answerList, setAnswerList] = useState<number[]>(
    Array(questionList.length)
  );

  const onClickAnswer = (index: number, answer: number) => {
    answerList[index] = answer;
    setAnswerList([...answerList]);

    // 새로운 답이 왔으면 다음 문제 표시
    if (index === curPage * COUNT_PER_PAGE + curCount - 1) {
      // 모든 문제 풀이
      if (index === questionList.length - 1) {
        onSubmit(answerList);
        return;
      }

      if (curCount < COUNT_PER_PAGE) {
        setCurCount(curCount + 1);

        setTimeout(() => {
          onScrollToBottom();
        }, 10);
      } else {
        // 마지막 페이지에 왔을 때 람다 콜드 스타트 방지,
        if (curPage + 1 === TOTAL_PAGE - 1) {
          axios.get(
            "https://gek2578p76.execute-api.ap-northeast-2.amazonaws.com/default/enneagram"
          );
        }

        // 다음 페이지
        setCurPage(curPage + 1);
        setCurCount(1);

        onScrollToTop();
      }
    }
  };

  const onScrollToTop = () => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth"
    });
  };

  const onScrollToBottom = () => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  };

  const answeredCount = answerList.filter(a => a !== undefined && a !== null).length;
  const progressPercent = Math.round((answeredCount / questionList.length) * 100);

  return (
    <div className="enneagram-survey">
      {/* Sticky Progress Section */}
      <div className="survey-progress-wrapper">
        <div className="progress-info">
          <div className="progress-meta">
            <span className="section-indicator">
              섹션 {curPage + 1} / {TOTAL_PAGE}
            </span>
            <span className="question-count">
              진행 문항 <strong>{answeredCount}</strong> / {questionList.length}
            </span>
          </div>
          <span className="percent-badge">{progressPercent}%</span>
        </div>
        <div className="custom-progress-track">
          <div
            className="custom-progress-bar"
            style={{ width: `${Math.max(progressPercent, 2)}%` }}
          />
        </div>
      </div>

      {/* Question Items */}
      <div className="questions-container">
        {questionList
          .slice(curPage * COUNT_PER_PAGE, curPage * COUNT_PER_PAGE + curCount)
          .map((e, index) => (
            <EnneagramItem
              key={curPage * COUNT_PER_PAGE + index}
              index={curPage * COUNT_PER_PAGE + index}
              question={e}
              onClickAnswer={onClickAnswer}
            />
          ))}
      </div>
    </div>
  );
};

export default Enneagram;
