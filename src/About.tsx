import React from "react";
import "./About.scss";

interface AboutProp {
  onClickStart: () => void;
}

const About: React.FC<AboutProp> = ({ onClickStart }) => {
  const guideList = [
    {
      icon: "🎯",
      title: "역량 평가가 아닙니다",
      desc: "점수가 높거나 낮다고 좋은 것이 아닙니다. 자신의 평소 생각과 자연스러운 느낌에 솔직하게 체크해 주세요."
    },
    {
      icon: "⚡",
      title: "직관적이고 빠르게",
      desc: "문항을 읽고 너무 오래 고민하지 마세요. 첫 느낌대로 편안하고 자연스럽게 응답할 때 가장 정확합니다."
    },
    {
      icon: "🌱",
      title: "이상보다 현실의 나",
      desc: "'되고 싶은 이상적인 나'의 모습이 아닌, 일상에서 무의식적으로 드러나는 실제 나의 행동 경향을 선택해 주세요."
    },
    {
      icon: "✨",
      title: "일관성에 얽매이지 마세요",
      desc: "이전 문항과 일관되게 답하려고 의식하지 마세요. 각 문항 자체에 집중하여 지금 와닿는 정도로 응답하시면 됩니다."
    }
  ];

  return (
    <div className="about-view">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-badge">
          <span className="sparkle">✨</span> 9가지 성격유형 정밀 진단
        </div>
        <h1 className="hero-title">
          나를 깊이 이해하고<br />
          <span className="gradient-text">진정한 잠재력</span>을 발견하세요
        </h1>
        <p className="hero-subtitle">
          에니어그램은 9가지 성격 역동을 통해 당신의 행동 동기와<br className="hide-mobile" />
          무의식적 패턴을 밝혀내어 더 나은 삶과 관계의 성장을 이끕니다.
        </p>

        {/* Quick Stats Bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-label">예상 소요시간</span>
            <span className="stat-value">약 7~8분</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-label">진단 문항</span>
            <span className="stat-value">총 81문항</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-label">결과 제공</span>
            <span className="stat-value">입체 레이더 차트</span>
          </div>
        </div>
      </div>

      {/* Guide Cards Grid */}
      <div className="guide-section">
        <h2 className="section-title">검사 전 유의사항</h2>
        <div className="guide-grid">
          {guideList.map((item, index) => (
            <div key={index} className="guide-card">
              <div className="guide-card-icon">{item.icon}</div>
              <div className="guide-card-body">
                <h3 className="guide-card-title">{item.title}</h3>
                <p className="guide-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="cta-wrapper">
        <button
          className="start-button"
          onClick={() => onClickStart()}
        >
          <span>검사 시작하기</span>
          <svg
            className="arrow-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
        <span className="cta-hint">별도의 회원가입 없이 바로 진단이 시작됩니다.</span>
      </div>
    </div>
  );
};

export default About;
