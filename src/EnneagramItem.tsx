import React, { useState } from "react";
import "./EnneagramItem.scss";

interface EnneagramItemProp {
  index: number;
  question: string;
  onClickAnswer: (index: number, answer: number) => void;
}

const EnneagramItem: React.FC<EnneagramItemProp> = ({
  index,
  question,
  onClickAnswer
}) => {
  const [rSelected, setRSelected] = useState<number>(-1);

  const scaleOptions = [
    { score: 1, label: "전혀 아니다", shortLabel: "전혀" },
    { score: 2, label: "그렇지 않다", shortLabel: "아님" },
    { score: 3, label: "보통이다", shortLabel: "보통" },
    { score: 4, label: "그런 편이다", shortLabel: "그런편" },
    { score: 5, label: "매우 그렇다", shortLabel: "매우" }
  ];

  const _onClickAnswer = (answer: number) => {
    setRSelected(answer);
    onClickAnswer(index, answer);
  };

  return (
    <div className={`enneagram-item ${rSelected > 0 ? "answered" : ""}`}>
      <div className="item-header">
        <span className="question-badge">Q.{index + 1}</span>
      </div>

      <h3 className="question-text">{question}</h3>

      <div className="scale-container">
        {scaleOptions.map((opt) => {
          const isSelected = rSelected === opt.score;
          return (
            <button
              key={opt.score}
              type="button"
              className={`scale-btn scale-${opt.score} ${isSelected ? "selected" : ""}`}
              onClick={() => _onClickAnswer(opt.score)}
              aria-label={opt.label}
            >
              <span className="score-indicator">
                {opt.score}
              </span>
              <span className="score-label">{opt.label}</span>
              <span className="score-label-mobile">{opt.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EnneagramItem;
