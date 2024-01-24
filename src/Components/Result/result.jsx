import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './result.css';

export const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, resultData } = location.state || {};

  const handleAnalyze = () => {
    const { questions, selectedOptions, correctAnswers, questionsAttempted } = resultData || {};

    navigate(`/report`, {
      state: {
        questions,
        selectedOptions,
        correctAnswers,
        questionsAttempted,
      }
    });
  };

  return (
    <div>
      <div className='header'>
        <h1>Final Result</h1>
      </div>
      <div className='result-card'>
        <div className='final-score'>
          <h4>Your final Score is :</h4>
          <h1>{score}/15</h1>
        </div>
        <div className='analyze-btn'>
          <button onClick={handleAnalyze}>Analyze</button>
        </div>
      </div>
    </div>
  );
};
