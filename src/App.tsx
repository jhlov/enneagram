import axios from "axios";
import React, { useState } from "react";
import About from "./About";
import "./App.css";
import Enneagram from "./Enneagram";
import Result from "./Result";

function App() {
  const [step, setStep] = useState<number>(0);
  const [scoreList, setScoreList] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClickStart = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onRestart = () => {
    setScoreList([]);
    setStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * 정답 제출
   * @param answerList 정답 리스트
   */
  const onSubmit = async (answerList: number[]) => {
    setIsLoading(true);
    setStep(2);

    try {
      const response = await axios.get(
        "https://gek2578p76.execute-api.ap-northeast-2.amazonaws.com/default/enneagram",
        {
          params: {
            answerList: answerList
          }
        }
      );
      if (response?.data?.score) {
        setScoreList(response.data.score);
      }
    } catch (error) {
      console.error("점수 산출 실패:", error);
      // 백업 계산 또는 예외 처리 (API 실패 시 클라이언트 사이드에서 안전하게 산출하거나 오류 처리)
    } finally {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="App">
      {/* Top Navigation Bar */}
      <header className="app-header">
        <div className="header-container">
          <div className="brand" onClick={() => onRestart()}>
            <div className="brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 1 10 10M12 2a10 10 0 0 0-10 10" />
                <path d="M12 2v20" />
                <path d="m4.93 4.93 14.14 14.14" />
                <path d="m4.93 19.07 14.14-14.14" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-title">ENNEAGRAM</span>
              <span className="brand-subtitle">성격유형 종합 검사</span>
            </div>
          </div>
          <div className="header-badge">
            {step === 0 && <span className="step-tag">안내</span>}
            {step === 1 && <span className="step-tag active">검사 진행 중</span>}
            {step === 2 && <span className="step-tag success">결과 분석</span>}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-container">
          {step === 0 && <About onClickStart={onClickStart} />}
          {step === 1 && <Enneagram onSubmit={onSubmit} />}
          {step === 2 && (
            <Result
              scoreList={scoreList}
              isLoading={isLoading}
              onRestart={onRestart}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2021 Enneagram Personality Insights. All rights reserved.</p>
        <p className="footer-disclaimer">본 검사는 자기이해와 성장을 돕기 위한 심리역동 진단 도구입니다.</p>
      </footer>
    </div>
  );
}

export default App;
