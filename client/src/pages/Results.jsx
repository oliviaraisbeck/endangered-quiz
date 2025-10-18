import React from 'react';
import '../styles/Results.css'; 
import { useLocation, useNavigate } from 'react-router-dom';
import scoringData from '../data/scoring.json';

const Results = () => {
  const scoring = scoringData.score;
  const location = useLocation();
  const navigate = useNavigate();
  const categoryScores = location.state?.categoryScores || {};

  return (
    <div className="container">
      <h1 className="title">Your Quiz Results</h1>
      {Object.keys(categoryScores).length === 0 ? (
        <p>No answers submitted.</p>
      ) : (
        <ul>
          {Object.entries(categoryScores).map(([category, score]) => (
            <li key={category}>
              <strong>{category}:</strong> {score}
            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
      
};

export default Results;