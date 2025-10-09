import React from 'react';
import './QuizPage.css'; 
import { useNavigate } from 'react-router-dom';
import questionData from '../data/questions.json';

const QuizPage = () => {
const questions = questionData.questions;
const navigate = useNavigate();
const results = () => {
    navigate('/results');
  };
  return (
    <div className="quiz-container">
      <h1>Personality Quiz</h1>
        <form id="quizForm">
        {questions.map((question, index) => (
        <div className="question" key={index}>
            <p>{question.text}</p>
            <div className="options">
            <label>
                <input type="radio" name={`q${index}`} value="1" /> Strongly Disagree
            </label>
            <label>
                <input type="radio" name={`q${index}`} value="2" /> Disagree
            </label>
            <label>
                <input type="radio" name={`q${index}`} value="3" /> Neutral
            </label>
            <label>
                <input type="radio" name={`q${index}`} value="4" /> Agree
            </label>
            <label>
                <input type="radio" name={`q${index}`} value="5" /> Strongly Agree
            </label>
            </div>
        </div>
        ))}
            <button type="submit" onClick={results}>Submit Quiz</button>
        </form>
    </div>
  );
};

export default QuizPage;
