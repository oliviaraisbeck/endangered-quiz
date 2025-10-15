import React, { useState } from 'react';
import '../styles/QuizPage.css'; 
import { useNavigate } from 'react-router-dom';
import questionData from '../data/questions.json';

const QuizPage = () => {
  const questions = questionData.questions;
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});

  const handleChange = (e, index) => {
    const value = parseInt(e.target.value);
    setAnswers(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryScores = {};

    questions.forEach((question, index) => {
        const score = answers[index] || 0; // default to 0 if unanswered
        const category = question.category; // Treat as single category
    
        if (!categoryScores[category]) {
          categoryScores[category] = 0;
        }
        categoryScores[category] += score;
      });
    // Send to results page with state
    navigate('/results', { state: { categoryScores } });
  };

  return (
    <div className="container">
      <h1 className="title">Personality Quiz</h1>
      <form id="quizForm" onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div className="question" key={index}>
            <p>{question.text}</p>
            <div className="options">
              {[1, 2, 3, 4, 5].map(value => (
                <label key={value}>
                  <input
                    type="radio"
                    name={`q${index}`}
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                  />{' '}
                  {[
                    'Strongly Disagree',
                    'Disagree',
                    'Neutral',
                    'Agree',
                    'Strongly Agree',
                  ][value - 1]}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  );
};

export default QuizPage;
