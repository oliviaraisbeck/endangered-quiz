import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Homepage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Welcome to the Personality Quiz</h1>
      <button className="button1" onClick={() => navigate('/quiz')}>
        Start Quiz
      </button>
    </div>
  );
};

export default HomePage;
