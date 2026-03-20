import React, { useState, useEffect } from 'react';
import '../styles/Results.css';
import { useLocation, useNavigate } from 'react-router-dom';
import animalsData from '../data/animals.json';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [animalDetails, setAnimalDetails] = useState(null);

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

  useEffect(() => {
    if (!nameKey) return;

    import(`../data/animals/${nameKey}.json`)
      .then((module) => setAnimalDetails(module.default))
      .catch((err) => console.error(err));
  }, [nameKey]);

  if (Object.keys(categoryScores).length === 0) {
    return (
      <div className="container">
        <h1 className="title">Your Quiz Results</h1>
        <p>No answers submitted.</p>
      </div>
    );
  }

  return (
    <div className="container">
      {animal ? (
        <div className="animal-results">
          {animalDetails ? (
            <div className="animal-details">
              <div className="animal-header">
                <div className="animal-info left">
                  <div className="animal-title">
                    <h2>{"Your animal is the...  "}</h2>
                    <h2 className="animal-name bold">{animal}!</h2>
                  </div>
                  <p className="description">{animalDetails.description}</p>
                  <button className="button1" onClick={() => navigate(`/animals/${animalDetails.name.replace(/\s+/g, "_")}`)}>Help Now</button> {/*make go to donations part with anchor later */}
                  <h2 >Why the {animal}</h2>
                  <p> {animalDetails.why} </p>
                </div>
                <div className="polaroid"> 
                  <img className="polaroid-img" src={animalDetails.image} alt={animalDetails.name} />
                  <p className="polaroid-title bold">"The {animalDetails.title}"</p>
                  <div className="animal-logo-circle">
                    <img
                      src={animalDetails.logo.replace("client/src/", "/")}
                      alt={`${animalDetails.name} logo`}
                      className="animal-logo"
                    />
                  </div>
                </div>
              </div>
              <div className="animals-grid"> {/* cssed in main cause idk whats happening? */}
                <div className="traits">
                  <p className="traits-header bold"> Your friends call you...</p>
                  {animalDetails.traits.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
                <div className="traits">
                  <p className="traits-header bold"> Likes</p>
                  {animalDetails.likes.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
                <div className="">
                  <p className="traits-header bold"> Dislikes</p>
                  {animalDetails.dislikes.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="animal-understand left">
                <h2> Understand your results</h2>
                {animalDetails.understandResult.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
                <button onClick={() => navigate(`/animals/${animalDetails.name.replace(/\s+/g, "_")}`)}>Learn More</button>
              </div>
              <div className="banner">
                <h2> Endangered Status</h2>
                <p>{animalDetails.facts["Endangered Status"]}</p>
                <button onClick={() => navigate(`/animals/${animalDetails.name.replace(/\s+/g, "_")}`)}>Help Now</button> {/*make go to donations part with anchor later */}
              </div>
            </div>
          ) : (
            <p>Loading animal details...</p>
          )}
        </div>
      ) : (
        <p>No animal found for this profile.</p>
      )}
    </div>
  );
};

export default Results;
