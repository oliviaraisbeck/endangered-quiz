import React from 'react';
import './QuizPage.css'; 
import questionData from '../data/questions.json';
console.log(questionData);

const QuizPage = () => {
const questions = questionData.questions;
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
            <button type="submit">Submit Quiz</button>
        </form>
    </div>
  );
};

export default QuizPage;
