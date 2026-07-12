import React, { useState } from 'react';
import '../styles/QuizPage.css'; 
import { useNavigate } from 'react-router-dom';
import questionData from '../data/questions.json';
import { shuffleArray } from './Homepage';

const questions = questionData.questions;
const shuffleQuestions = shuffleArray(questions); //shuffle questions

const QuizPage = () => {

  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});

  const handleChange = (e, index) => {
    let value; 

    if (e.target.value === 'true') {
        value = true;
    } else if (e.target.value === 'false') {
        value = false;
    } else {
        value = parseInt(e.target.value); 
    }
    setAnswers(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const unanswered = shuffleQuestions.some((_, index) => answers[index] === undefined);

    if (unanswered) {
      alert("Please answer every question before submitting.");
      return;
    }

    const categoryScores = {};

    shuffleQuestions.forEach((question, index) => {
        let score = answers[index];
        //const score = answers[index] || 0; // default to 0 if unanswered
        if (score === true) {
            score = 2; // true → 2 points
          } else if (score === false) {
            score = 1; // false → 1 point
          } else if (typeof score !== 'number') {
            score = 0; // unanswered → 0
          }
        const category = question.category; 
    
        if (!categoryScores[category]) {
          categoryScores[category] = 0;
        }
        categoryScores[category] += score;
      });
    // Send to results page with state
    navigate('/results', { state: { categoryScores } });
  };

  const GradientArrow = () => {
    return (
      <svg
        viewBox="0 0 400 40"
        className="gradient-arrow"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#96c976" />
            <stop offset="50%" stopColor="#b6b7b7" />
            <stop offset="100%" stopColor="#cc802f" />
          </linearGradient>
        </defs>

        <polygon
          points="
            0,20 
            20,0 
            20,13 
            380,13 
            380,0 
            400,20 
            380,40 
            380,27 
            20,27 
            20,40
          "
          fill="url(#arrowGradient)"
        />
      </svg>
    );
  };
  const nextPage = () => {
    const unanswered = visibleQuestions.some((_, localIndex) => {
      const index = startIndex + localIndex;
      return answers[index] === undefined;
    });

    if (unanswered) {
      alert("Please answer all questions before continuing.");
      return;
    }
    setPage(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const previousPage = () => {
    setPage(prev => prev - 1);

    window.scrollTo(0, 0);
  };

  const QUESTIONS_PER_PAGE = 10; // out of 30 questions 
  const totalPages = 3; // change if questions change
  const [page, setPage] = useState(0);

  const startIndex = page * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;

  const visibleQuestions = shuffleQuestions.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1 className="title">Which endangered animal are you most similar to?</h1>
      <div className="lower-padding">
        <div className="instructions">
          <h1>Quiz Instructions</h1>
          <p>Rank the following by how much you agree or disagree with each statement.</p>
          <div className="scale-visual">
            <GradientArrow />
            <div className="scale-labels">
              {[5,4,3,2,1].map((value, i) => (
                <span key={i} className={`scale-tick tick-${value}`}>
                  {['Strongly Agree','Agree','Neutral','Disagree','Strongly Disagree'][5 - value]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <form id="quizForm" onSubmit={handleSubmit}>
        {visibleQuestions.map((question, localIndex) => {
          const index = startIndex + localIndex;

          return (
            <div className="question" key={index}>
              <h3>{question.text}</h3>

              <div className="options">
                {[5,4,3,2,1].map(value => (
                  <label key={value} className={'option'}>
                          <div className="radio-wrapper">
                            <input
                              type="radio"
                              name={`q${index}`}
                              value={value}
                              checked={answers[index] === value}
                              onChange={(e) => handleChange(e, index)}
                              className={`radio-${value}`}
                          /></div>
                          <span className="option-text">
                            {[
                              'Strongly Disagree',
                              'Disagree',
                              'Neutral',
                              'Agree',
                              'Strongly Agree',
                            ][value - 1]}
                          </span>
                        </label>
                ))}
              </div>
            </div>
          );
        })}
        <div className="quiz-navigation">
          {page > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                previousPage();
              }}
            >
              ← Previous
            </button>
          )}

          <span>
            Page {page + 1} / {totalPages}
          </span>

          {page < totalPages - 1 ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                nextPage();
              }}
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuizPage;
