import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Homepage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/quiz');
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to the Personality Quiz</h1>
      <button className="start-button" onClick={handleStart}>
        Start Quiz
      </button>
    </div>
  );
};

export default HomePage;
