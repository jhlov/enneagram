import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import React, { useMemo, useState } from "react";
import "./Result.scss";

HighchartsMore(Highcharts);

interface ResultProp {
  scoreList: number[];
  isLoading?: boolean;
  onRestart?: () => void;
}

interface TypeInfo {
  number: number;
  name: string;
  english: string;
  tagline: string;
  tags: string[];
  description: string;
  strength: string;
  advice: string;
}

const TYPE_DETAILS: Record<number, TypeInfo> = {
  1: {
    number: 1,
    name: "개혁가",
    english: "The Reformer",
    tagline: "원칙과 정의를 추구하는 완벽주의자",
    tags: ["#원칙주의", "#정직함", "#자기통제", "#완벽추구"],
    description: "올바른 기준과 신념에 따라 세상을 개선하고자 노력하며, 높은 도덕적 이상을 실천합니다. 매사에 철저하고 성실하며 책임감이 강합니다.",
    strength: "뛰어난 윤리의식, 높은 추진력과 꼼꼼한 완성도, 조직의 규율 확립",
    advice: "자신과 타인의 불완전함을 너그럽게 수용하고, 과정 자체를 즐기는 여유를 가져보세요."
  },
  2: {
    number: 2,
    name: "조력가",
    english: "The Helper",
    tagline: "사랑과 배려를 나누는 따뜻한 인도주의자",
    tags: ["#이타심", "#공감능력", "#헌신", "#인간관계"],
    description: "주변 사람들의 필요를 세심하게 알아채고 진심으로 도움을 주며 기쁨을 느낍니다. 친절하고 배려심이 깊어 사람들을 연결합니다.",
    strength: "탁월한 공감 능력, 따뜻한 포용력, 갈등을 치유하는 진심 어린 관심",
    advice: "남을 돌보느라 자신의 욕구와 감정을 뒷전으로 미루지 마세요. 거절하는 법도 필요합니다."
  },
  3: {
    number: 3,
    name: "성취자",
    english: "The Achiever",
    tagline: "목표를 향해 끊임없이 도전하는 실행가",
    tags: ["#목표달성", "#효율성", "#성공지향", "#자기관리"],
    description: "명확한 비전과 강력한 집중력으로 성과를 창출합니다. 어떤 환경에서도 빠르게 적응하고 자신의 잠재력을 최대한 발휘합니다.",
    strength: "뛰어난 생산성, 프로페셔널한 태도, 동기부여와 솔선수범의 리더십",
    advice: "성취나 외부의 인정만이 자신의 가치는 아닙니다. 진정한 내면의 행복을 돌아보세요."
  },
  4: {
    number: 4,
    name: "예술가",
    english: "The Individualist",
    tagline: "독창성과 깊은 감성을 품은 탐구자",
    tags: ["#개성", "#감수성", "#독창성", "#자기표현"],
    description: "평범함을 거부하고 자신만의 독특한 가치와 아름다움을 창조합니다. 감정의 깊이가 풍부하고 직관력이 뛰어납니다.",
    strength: "독보적인 창의성, 깊은 공감과 미적 감각, 진정성 있는 자기표현",
    advice: "감정의 굴곡에 지나치게 매몰되지 않고, 일상의 규칙적인 행동을 통해 균형을 유지하세요."
  },
  5: {
    number: 5,
    name: "사색가",
    english: "The Investigator",
    tagline: "지식과 통찰로 세상을 꿰뚫어보는 관찰자",
    tags: ["#통찰력", "#분석적", "#전문성", "#객관성"],
    description: "호기심이 많고 논리적이며 복잡한 원리를 파고듭니다. 독립적인 사색 시간을 소중히 여기며 감정에 휩쓸리지 않는 객관성을 지닙니다.",
    strength: "깊이 있는 전문 지식, 뛰어난 문제 해결력, 냉철하고 객관적인 분석",
    advice: "생각의 영역에서 벗어나 사람들과 지식을 나누고 실제 행동으로 옮겨보세요."
  },
  6: {
    number: 6,
    name: "충성가",
    english: "The Loyalist",
    tagline: "신뢰와 책임감으로 든든함을 주는 수호자",
    tags: ["#충성심", "#신뢰", "#위험관리", "#협동심"],
    description: "약속과 의리를 중시하며 조직이나 관계에 확고한 헌신을 다합니다. 발생 가능한 위험을 미리 예측하고 철저히 대비합니다.",
    strength: "철저한 위기 대응력, 끝까지 함께하는 신의, 단단한 팀워크 구축",
    advice: "미래에 대한 과도한 불안을 내려놓고, 자신의 직관과 내면의 힘을 믿어보세요."
  },
  7: {
    number: 7,
    name: "낙천가",
    english: "The Enthusiast",
    tagline: "열정과 호기심으로 가득한 모험가",
    tags: ["#다재다능", "#긍정에너지", "#모험심", "#아이디어"],
    description: "삶의 다채로운 가능성을 즐기며 늘 새로운 자극과 영감을 추구합니다. 밝고 활력 있는 에너지는 주변 사람들에게도 활기를 불어넣습니다.",
    strength: "뛰어난 순발력, 풍부한 아이디어, 어떤 역경도 유연하게 극복하는 낙관성",
    advice: "새로운 것만 쫓기보다 시작한 일에 끝까지 깊이 몰입하고 마무리하는 힘을 길러보세요."
  },
  8: {
    number: 8,
    name: "지도자",
    english: "The Challenger",
    tagline: "당당한 카리스마로 정의를 실현하는 개척자",
    tags: ["#카리스마", "#결단력", "#리더십", "#강한의지"],
    description: "자신감이 넘치고 솔직하며 불의에 맞서 약자를 보호합니다. 목표를 향해 주저 없이 돌진하며 역경 속에서 더욱 강해집니다.",
    strength: "강력한 결단력과 추진력, 솔직 담백한 의사소통, 사람들을 보호하는 듬직함",
    advice: "자신의 취약한 면도 솔직히 드러내고, 부드러운 경청으로 타인의 속도에 맞춰주세요."
  },
  9: {
    number: 9,
    name: "중재자",
    english: "The Peacemaker",
    tagline: "조화와 평화를 선물하는 포용의 수용자",
    tags: ["#평화주의", "#포용력", "#안정감", "#갈등중재"],
    description: "모든 사람의 관점을 이해하고 수용하며 따뜻한 안정감을 줍니다. 갈등을 조율하고 평화로운 분위기를 조성하는 타고난 중재자입니다.",
    strength: "편견 없는 경청과 수용, 편안한 안정감, 다양한 입장을 화합시키는 힘",
    advice: "자신의 우선순위와 의견을 주저 없이 명확하게 표현하는 용기를 발휘해보세요."
  }
};

const Result: React.FC<ResultProp> = ({ scoreList, isLoading = false, onRestart }) => {
  const [copyFeedback, setCopyFeedback] = useState<string>("");

  const typeNameList = useMemo(() => [
    "개혁가",
    "조력가",
    "성취자",
    "예술가",
    "사색가",
    "충성가",
    "낙천가",
    "지도자",
    "중재자"
  ], []);

  // 상위 유형 계산
  const topTypeNumbers = useMemo(() => {
    if (!scoreList || scoreList.length === 0) return [1];
    const maxScore = Math.max(...scoreList);
    const indexes: number[] = [];
    scoreList.forEach((score, idx) => {
      if (score === maxScore) {
        indexes.push(idx + 1);
      }
    });
    return indexes;
  }, [scoreList]);

  const primaryTypeInfo = TYPE_DETAILS[topTypeNumbers[0]] || TYPE_DETAILS[1];

  // 랭킹 리스트 (내림차순 정렬)
  const rankingList = useMemo(() => {
    if (!scoreList || scoreList.length === 0) return [];
    return scoreList
      .map((score, index) => ({
        typeNumber: index + 1,
        name: typeNameList[index],
        score: score,
        percent: Math.round((score / 45) * 100)
      }))
      .sort((a, b) => b.score - a.score);
  }, [scoreList, typeNameList]);

  // Highcharts Polar Radar Chart
  const options: Highcharts.Options = useMemo<Highcharts.Options>(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    return {
      chart: {
        polar: true,
        type: "area",
        backgroundColor: "transparent",
        height: isMobile ? 360 : 440,
        style: {
          fontFamily: "'Pretendard', sans-serif"
        }
      },
      title: {
        text: undefined
      },
      pane: {
        startAngle: 0,
        endAngle: 360,
        size: isMobile ? "75%" : "85%"
      },
      xAxis: {
        categories: typeNameList.map(
          (name, idx) => `<span style="font-weight:700; color:#334155;">${idx + 1}번</span><br/><span style="color:#64748b; font-size:12px;">${name}</span>`
        ),
        tickmarkPlacement: "on",
        lineWidth: 0,
        labels: {
          useHTML: true,
          style: {
            fontSize: isMobile ? "12px" : "13.5px",
            lineHeight: "1.3"
          }
        },
        gridLineColor: "#e2e8f0",
        gridLineDashStyle: "Dash"
      },
      yAxis: {
        min: 0,
        max: 45,
        tickInterval: 15,
        gridLineColor: "#f1f5f9",
        gridLineInterpolation: "polygon",
        labels: {
          style: {
            color: "#94a3b8",
            fontSize: "10px"
          }
        }
      },
      tooltip: {
        shared: true,
        useHTML: true,
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        borderColor: "transparent",
        borderRadius: 12,
        style: {
          color: "#ffffff",
          fontSize: "13px"
        },
        formatter: function () {
          const point = this.points ? this.points[0] : null;
          if (!point) return "";
          return `
            <div style="padding: 4px 6px;">
              <strong style="color: #a5b4fc;">${point.x}</strong><br/>
              점수: <b style="color:#ffffff;">${point.y}점</b> / 45점
            </div>
          `;
        }
      },
      plotOptions: {
        series: {
          animation: {
            duration: 1000
          }
        },
        area: {
          marker: {
            enabled: true,
            radius: 4,
            fillColor: "#ffffff",
            lineWidth: 2.5,
            lineColor: "#6366f1"
          },
          lineWidth: 2.5,
          color: "#6366f1",
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, "rgba(99, 102, 241, 0.45)"],
              [1, "rgba(168, 85, 247, 0.1)"]
            ]
          }
        }
      },
      series: [
        {
          type: "area",
          name: "유형 점수",
          data: scoreList && scoreList.length === 9 ? scoreList : [0, 0, 0, 0, 0, 0, 0, 0, 0],
          showInLegend: false
        }
      ],
      credits: {
        enabled: false
      }
    };
  }, [scoreList, typeNameList]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback("검사 링크가 복사되었습니다!");
      setTimeout(() => setCopyFeedback(""), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="result-loading">
        <div className="spinner-glow" />
        <h2 className="loading-title">에니어그램 성격 역동 분석 중...</h2>
        <p className="loading-desc">9가지 지표 데이터를 기반으로 정밀 레이더 차트를 생성하고 있습니다.</p>
      </div>
    );
  }

  return (
    <div className="result-view">
      {/* Top Banner */}
      <div className="result-header">
        <div className="result-badge">
          <span>✨</span> 검사 결과 보고서
        </div>
        <h1 className="result-title">
          당신의 대표 성격 유형은<br />
          <span className="type-highlight">
            {primaryTypeInfo.number}번 {primaryTypeInfo.name}
          </span>
          {topTypeNumbers.length > 1 && (
            <span className="co-type"> (공동 1위: {topTypeNumbers.map(n => `${n}번 ${TYPE_DETAILS[n].name}`).join(", ")})</span>
          )}
          입니다
        </h1>
        <p className="result-tagline">{primaryTypeInfo.tagline}</p>
      </div>

      {/* Large Featured Character Illustration (Above Card) */}
      <div className="featured-illust-container">
        <div className="featured-illust-frame">
          <img
            src={`${process.env.PUBLIC_URL}/images/types/type${primaryTypeInfo.number}.jpg`}
            alt={primaryTypeInfo.name}
            className="featured-illust-img"
          />
          <div className="illust-ambient-glow" />
        </div>
        <div className="illust-type-pill">
          <span className="pill-badge">Type {primaryTypeInfo.number}</span>
          <span className="pill-name">{primaryTypeInfo.name}</span>
          <span className="pill-english">{primaryTypeInfo.english}</span>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="profile-card">
        <div className="card-top-row">
          <div className="tag-list">
            {primaryTypeInfo.tags.map((tag, idx) => (
              <span key={idx} className="tag-chip">{tag}</span>
            ))}
          </div>
        </div>

        <h2 className="profile-name">
          {primaryTypeInfo.name} <span className="profile-english">{primaryTypeInfo.english}</span>
        </h2>

        <p className="profile-desc">{primaryTypeInfo.description}</p>

        <div className="feature-grid">
          <div className="feature-box strength">
            <div className="feature-title">
              <span>🌟</span> 주요 강점
            </div>
            <p className="feature-text">{primaryTypeInfo.strength}</p>
          </div>
          <div className="feature-box advice">
            <div className="feature-title">
              <span>🌱</span> 성장을 위한 조언
            </div>
            <p className="feature-text">{primaryTypeInfo.advice}</p>
          </div>
        </div>
      </div>

      {/* Radar Chart Section */}
      <div className="chart-section">
        <div className="section-header">
          <h3 className="section-title">9가지 성격유형 레이더 분석</h3>
          <p className="section-desc">에니어그램은 단 하나의 유형에 국한되지 않고, 9가지 성향의 조화와 균형을 보여줍니다.</p>
        </div>
        <div className="chart-wrapper">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>

      {/* Ranking Breakdown List */}
      <div className="ranking-section">
        <h3 className="section-title">전체 유형별 점수 랭킹</h3>
        <div className="ranking-grid">
          {rankingList.map((item, idx) => {
            const isTop = idx === 0;
            return (
              <div key={item.typeNumber} className={`ranking-card ${isTop ? "is-top" : ""}`}>
                <div className="ranking-rank">
                  {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}`}
                </div>
                <img
                  src={`${process.env.PUBLIC_URL}/images/types/type${item.typeNumber}.jpg`}
                  alt={item.name}
                  className="ranking-thumb"
                />
                <div className="ranking-body">
                  <div className="ranking-header">
                    <span className="ranking-type-name">
                      <strong>{item.typeNumber}번</strong> {item.name}
                    </span>
                    <span className="ranking-score-value">
                      <strong>{item.score}</strong> / 45점
                    </span>
                  </div>
                  <div className="ranking-bar-track">
                    <div
                      className={`ranking-bar-fill ${isTop ? "primary-fill" : ""}`}
                      style={{ width: `${Math.max(item.percent, 3)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons-wrapper">
        {onRestart && (
          <button className="btn-restart" onClick={onRestart}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>다시 검사하기</span>
          </button>
        )}
        <button className="btn-share" onClick={handleShare}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <span>링크 복사하기</span>
        </button>
      </div>

      {copyFeedback && (
        <div className="toast-notification">
          {copyFeedback}
        </div>
      )}
    </div>
  );
};

export default Result;
