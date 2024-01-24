import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './report.css';

export const Report = () => {
  const location = useLocation();
  const { questions, selectedOptions, correctAnswers, questionsAttempted } = location.state || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();
  console.log(questions)
  console.log(selectedOptions)
  console.log(correctAnswers)
  console.log(questionsAttempted)

  const handleNext = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const buttonStyle = index => {
    const isAttempted = questionsAttempted.has(index);
    const isCorrect = correctAnswers[index-1] === selectedOptions[index];
  
    return {
      fontWeight: isAttempted ? 'bold' : 'normal',
      backgroundColor: isAttempted
        ? isCorrect
          ? 'lightgreen'
          : 'red'
        : 'grey',
      color: 'black',
    };
  };

  return (
    <div className='quiz-page-container'>
      <h3 className='question-page-header'>Analysis Report</h3>
      <div className='question-navigation-container'>
        <div className='question-navigation-grid'>
          {questions.map((question, index) => (
            <button
              key={index}
              className={buttonStyle(question.index)}
              onClick={() => setCurrentQuestionIndex(question.index - 1)}
            >
              {question.index}
            </button>
          ))}
        </div>
      </div>

      {currentQuestion && (
  <div className='question-container'>
    <p className='questions'>Question {currentQuestion.index}:</p>
    <p className='questions'>{currentQuestion.question}</p>
    <p className='questions'>
      Status: {questionsAttempted.has(currentQuestion.index) ? (correctAnswers[currentQuestion.index-1] === selectedOptions[currentQuestion.index] ? 'Correct' : 'Incorrect') : 'Not Attempted'}
    </p>
    <ul>
      {currentQuestion.choices.map((choice, index) => (
        <li
          className='choices'
          key={index}
          style={{
            backgroundColor:
              correctAnswers[currentQuestion.index-1] === choice
                ? 'lightgreen'
                : selectedOptions[currentQuestion.index] === choice
                ? 'red'
                : 'white',
          }}
        >
          {choice}
        </li>
      ))}
    </ul>
    <button
      className='previous-btn'
      onClick={handlePrevious}
      disabled={currentQuestionIndex === 0}
    >
      Previous
    </button>
    <button
      className='next-btn'
      onClick={handleNext}
      disabled={currentQuestionIndex === questions.length - 1}
    >
      Next
    </button>
  </div>
)}


      <div className='exit-button'>
        <button onClick={() => navigate('/')}>
          Exit
        </button>
      </div>
    </div>
  );
};
