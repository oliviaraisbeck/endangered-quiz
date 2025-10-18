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

  return (
    <div className="container">
      <h1 className="title">Personality Quiz</h1>
      <form id="quizForm" onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div className="question" key={index}>
            <p>{question.text}</p>
            <div className="options">
                {question.category === 'Neuroticism' ? (
                    <>
                        <label>
                            <input 
                            type="radio"
                            name={`q${index}`}
                            value="true"
                            onChange={(e) => handleChange(e, index)}
                            />
                            True
                        </label>
                        <label>
                            <input 
                            type="radio"
                            name={`q${index}`}
                            value="false"
                            onChange={(e) => handleChange(e, index)}
                            />
                            False
                        </label>
                    </>
                ) : (
                    [1, 2, 3, 4, 5].map(value => (
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
                      ))

                )}
            </div>
          </div>
        ))}
        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  );
};

export default QuizPage;
