import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './quizpage.css';
import axios from 'axios';

export const QuizPage = () => {
  const location = useLocation();
  const { name } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsAttempted, setQuestionsAttempted] = useState(new Set());
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [timerRunning, setTimerRunning] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (timerRunning && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
    if (timeRemaining === 0) {
      handleQuizSubmit();
      setTimerRunning(false);
    }
  }, [timeRemaining, timerRunning]);

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=15').then(response => {
      const extractedQuestions = response.data.results.map((result, index) => ({
        index: index + 1,
        question: result.question,
        choices: shuffleArray([result.correct_answer, ...result.incorrect_answers]),
      }));
      const correctAnswers = response.data.results.map(question => question.correct_answer);
      setCorrectAnswers(correctAnswers)
      setQuestions(extractedQuestions);
    });
  }, []);

  const shuffleArray = arr => {
    const shuffledArray = [...arr];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleNext = () => {
    const isCorrect = correctAnswers[currentQuestion.index-1] === selectedOptions[currentQuestion.index];
    console.log(selectedOptions[currentQuestion.index])
    setScore(score => (isCorrect ? score + 1 : score));
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setSelectedOption(null);
  };  

  const handlePrevious = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    setSelectedOption(null);
  };

  const handleQuestionClick = index => {
    setCurrentQuestionIndex(index - 1);
    setSelectedOption(null);
  };  

  const handleOptionClick = (option) => {
    setQuestionsAttempted(new Set([...questionsAttempted, currentQuestion.index]));
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [currentQuestion.index]: option,
    }));
  };

  const handleQuizSubmit = () => {
    const resultData = {
      questions,
      selectedOptions,
      correctAnswers,
      questionsAttempted,
    };
    navigate(`/result`, { state: { score, resultData } });
  };  

  const currentQuestion = questions[currentQuestionIndex];

  const buttonStyle = index => ({
    fontWeight: questionsAttempted.has(index) ? 'bold' : 'normal',
    backgroundColor:
      index === currentQuestionIndex + 1
        ? '#3498db'
        : questionsAttempted.has(index)
        ? 'lightgreen'
        : 'white',
    color:
      index === currentQuestionIndex + 1
        ? 'white'
        : questionsAttempted.has(index)
        ? 'black'
        : 'black',
  }); 

  return (
    <div className='quiz-page-container'>.
      <h3 className='quiz-page-header'>Hello, {name} !</h3>
    <div className='question-navigation-container'>
      <div className='question-navigation-grid'>
      {questions.map((question, index) => (
        <button
          key={index}
          className='question-button'
          style={buttonStyle(question.index)}
          onClick={() => handleQuestionClick(question.index)}
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
          <ul>
          {currentQuestion.choices.map((choice, index) => (
            <li
              className='choices'
              key={index}
              style={{
                backgroundColor: selectedOptions[currentQuestion.index] === choice ? 'lightblue' : 'white',
              }}
              onClick={() => handleOptionClick(choice)}
            >
              {choice}
            </li>
          ))}
          </ul>
          <button className='previous-btn' onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          <button className='next-btn'
            onClick={() => {
              handleNext();
            }}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>
        </div>
      )}
      <div className='submit-button'>
        <p className='timer'>Time Remaining: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60 < 10 ? '0' : ''}{timeRemaining % 60}</p>
        <button onClick={handleQuizSubmit} >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};