import React, { useState } from 'react';
import '../styles/QuizPage.css'; 
import { useNavigate } from 'react-router-dom';
import questionData from '../data/questions.json';

const QuizPage = () => {
  const questions = questionData.questions;
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

    const categoryScores = {};

    questions.forEach((question, index) => {
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

  return (
    <div className="container">
      <h1 className="title">Which endangered animal are you most similar to?</h1>
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
      <form id="quizForm" onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div className="question" key={index}>
            <h3>{question.text}</h3>
            <div className="options">
                {question.category === 'Neuroticism' ? (
                    <>
                        <label className={'option'}>
                            <input 
                            type="radio"
                            name={`q${index}`}
                            value="true"
                            onChange={(e) => handleChange(e, index)}
                            className="radio-5"
                            />
                            <span className="option-text">True</span>
                        </label>
                        <label className={'option'}>
                            <input 
                            type="radio"
                            name={`q${index}`}
                            value="false"
                            onChange={(e) => handleChange(e, index)}
                            className="radio-1"
                            />
                            <span className="option-text">False</span>
                        </label>
                    </>
                ) : (
                    [5,4,3,2,1].map(value => (
                        <label key={value} className={'option'}>
                          <div className="radio-wrapper">
                            <input
                              type="radio"
                              name={`q${index}`}
                              value={value}
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
                      ))

                )}
            </div>
          </div>
        ))}
        <button className="submit-button" type="submit">Submit Quiz</button>
      </form>
    </div>
  );
};

export default QuizPage;
