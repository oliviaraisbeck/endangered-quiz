import React, { useState, useEffect } from 'react';
import '../styles/Results.css';
import { useLocation, useNavigate } from 'react-router-dom';
import animalsData from '../data/animals.json';

const Results = () => {

  // ---------------------------
  // ✅ ALL HOOKS GO FIRST
  // ---------------------------
  const location = useLocation();
  const navigate = useNavigate();

  const [animalDetails, setAnimalDetails] = useState(null);

  // ---------------------------
  // Now safe: these run every render
  // ---------------------------
  const categoryScores = location.state?.categoryScores || {};

  const getHL = (category, score) => {
    switch (category) {
      case 'Class of P/Q': return score >= 30 ? 'PT/QF' : 'QL/QU';
      case 'Social Behavior': return score > 15 ? 'RE' : 'AC';
      case 'Environment Behavior': return score > 15 ? 'AC' : 'RE';
      case 'Migration': return score > 15 ? 'MOB' : 'IDL';
      case 'Neuroticism': return score > 7.5 ? 'AC' : 'RE';
      default: return '';
    }
  };

  const profileObj = {
    'P/Q': getHL('Class of P/Q', categoryScores['Class of P/Q']),
    'Social': getHL('Social Behavior', categoryScores['Social Behavior']),
    'Environ': getHL('Environment Behavior', categoryScores['Environment Behavior']),
    'Migrat': getHL('Migration', categoryScores['Migration']),
    'Neuro': getHL('Neuroticism', categoryScores['Neuroticism'])
  };

  const animal = Object.entries(animalsData).find(([name, data]) =>
    data['P/Q'] === profileObj['P/Q'] &&
    data['Social'] === profileObj['Social'] &&
    data['Environ'] === profileObj['Environ'] &&
    data['Migrat'] === profileObj['Migrat'] &&
    data['Neuro'] === profileObj['Neuro']
  )?.[0];

  const nameKey = animal?.replace(/ /g, "_");

  // ---------------------------
  // ✅ Hook is in the right place
  // ---------------------------
  useEffect(() => {
    if (!nameKey) return;

    import(`../data/animals/${nameKey}.json`)
      .then((module) => setAnimalDetails(module.default))
      .catch((err) => console.error(err));
  }, [nameKey]);


  // ---------------------------
  // EARLY RETURN MUST COME *AFTER* ALL HOOKS
  // ---------------------------
  if (Object.keys(categoryScores).length === 0) {
    return (
      <div className="container">
        <h1 className="title">Your Quiz Results</h1>
        <p>No answers submitted.</p>
      </div>
    );
  }

  // ---------------------------
  // MAIN RENDER
  // ---------------------------
  return (
    <div className="container">
      <h1 className="title">Your Quiz Results</h1>

      <h2>Your Animal</h2>
      {animal ? (
        <>
          <h3>{animal}</h3>

          {animalDetails ? (
            <div className="animal-details">
              <img src={animalDetails.image} alt={animalDetails.name} />
              <p>{animalDetails.description}</p>
            </div>
          ) : (
            <p>Loading animal details...</p>
          )}
        </>
      ) : (
        <p>No animal found for this profile.</p>
      )}
    </div>
  );
};

export default Results;
