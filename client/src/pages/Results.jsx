import React from 'react';
import '../styles/Results.css';
import { useLocation, useNavigate } from 'react-router-dom';
import animalsData from '../data/animals.json';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const categoryScores = location.state?.categoryScores || {};

  if (Object.keys(categoryScores).length === 0) {
    return (
      <div className="container">
        <h1 className="title">Your Quiz Results</h1>
        <p>No answers submitted.</p>
      </div>
    );
  }

  // Convert numeric scores to High/Low letters
  const getHL = (category, score) => {
    switch (category) {
      case 'Class of P/Q':
        return score >= 30 ? 'PT/QF' : 'QL/QU';
      case 'Social Behavior':
        return score > 15 ? 'RE' : 'AC';
      case 'Environment Behavior':
        return score > 15 ? 'AC' : 'RE';
      case 'Migration':
        return score > 15 ? 'MOB' : 'IDL';
      case 'Neuroticism':
        return score > 7.5 ? 'AC' : 'RE';
      default:
        return '';
    }
  };

  // Build profile object instead of string
  const profileObj = {
    'P/Q': getHL('Class of P/Q', categoryScores['Class of P/Q']),
    'Social': getHL('Social Behavior', categoryScores['Social Behavior']),
    'Environ': getHL('Environment Behavior', categoryScores['Environment Behavior']),
    'Migrat': getHL('Migration', categoryScores['Migration']),
    'Neuro': getHL('Neuroticism', categoryScores['Neuroticism'])
  };

  // Find animal matching profile
  const animal = Object.entries(animalsData).find(([name, data]) =>
    data['P/Q'] === profileObj['P/Q'] &&
    data['Social'] === profileObj['Social'] &&
    data['Environ'] === profileObj['Environ'] &&
    data['Migrat'] === profileObj['Migrat'] &&
    data['Neuro'] === profileObj['Neuro']
  )?.[0];


  return (
    <div className="container">
      <h1 className="title">Your Quiz Results</h1>

      <h2>Category Scores</h2>
      <ul>
        {Object.entries(categoryScores).map(([category, score]) => (
          <li key={category}>
            <strong>{category}:</strong> {score}
          </li>
        ))}
      </ul>

      <h2>Your Animal</h2>
      {animal ? (
        <h3>{animal}</h3>
      ) : (
        <p>No animal found for this profile.</p>
      )}
    </div>
  );
};

export default Results;
