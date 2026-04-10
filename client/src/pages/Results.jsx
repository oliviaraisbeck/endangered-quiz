import React, { useState, useEffect } from 'react';
import '../styles/Results.css';
import { useLocation, useNavigate } from 'react-router-dom';
import animalsData from '../data/animals.json';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [animalDetails, setAnimalDetails] = useState(null);

  const categoryScores = location.state?.categoryScores || {};

  const [activeIndex, setActiveIndex] = useState(0);

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

  const traitLabels = {
  "Class of P/Q": {
    left: "Low",
    right: "High"
  },
  "Social Behavior": {
    left: "Low",
    right: "High"
  },
  "Environment Behavior": {
    left: "Low",
    right: "High"
  },
  "Migration": {
    left: "Low",
    right: "High"
  },
  "Neuroticism": {
    left: "Low",
    right: "High"
  }
  };

const traitRanges = {
  "Class of P/Q": { min: 10, max: 50 },
  "Social Behavior": { min: 5, max: 25 },
  "Environment Behavior": { min: 5, max: 25 },
  "Migration": { min: 5, max: 25 },
  "Neuroticism": { min: 5, max: 10 }
};

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
                  <button
                    className="button1"
                    onClick={() => {
                    console.log("Opening URL:", animalDetails.donationURL);
                    window.open(animalDetails.donationURL, "_blank", "noopener,noreferrer");
                  }}
                    >
                    HELP NOW!
                  </button>
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
              <div className="understand-grid left">
                <h2>Understand your results</h2>

                <div className="understand-layout">
                  {/* Left BARS */}
                  <div className="understand-bars">
                    {animalDetails.understandResult.map((item, index) => {
                      const score = categoryScores[item.key] || 0;
                      const range = traitRanges[item.key];

                      const percent = range
                        ? ((score - range.min) / (range.max - range.min)) * 100
                        : 0;

                      const percentClamped = Math.min(100, Math.max(0, percent));
                      const isActive = index === activeIndex;

                      return (
                        <div
                          key={index}
                          className={`bar-wrapper ${isActive ? "active" : ""}`}
                          onClick={() => setActiveIndex(index)}
                        >
                          
                          <div className="bar-container">
                            <div className="bar" />
                            <div className="bar-floating-title">
                            {item.title}
                          </div>
                            <div
                              className="arrow-wrapper"
                              style={{ left: `${percentClamped}%` }}
                            >
                              <div className="arrow" />
                            </div>
                          </div>

                          <div className="bar-labels">
                            <span>{traitLabels[item.key]?.left}</span>
                            <span>{traitLabels[item.key]?.right}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* LEFT TEXT */}
                  <div className="understand-text-panel">
                    <button
                      className="nav-arrow"
                      onClick={() =>
                        setActiveIndex((prev) =>
                          (prev - 1 + animalDetails.understandResult.length) %
                          animalDetails.understandResult.length
                        )
                      }
                    >
                      ←
                    </button>

                    <div className="detail-content">
                      <h3>
                        {animalDetails.understandResult[activeIndex].title}
                      </h3>
                      <p>
                        {animalDetails.understandResult[activeIndex].text}
                      </p>
                    </div>

                    <button
                      className="nav-arrow"
                      onClick={() =>
                        setActiveIndex((prev) =>
                          (prev + 1) % animalDetails.understandResult.length
                        )
                      }
                    >
                      →
                    </button>

                  </div>

                </div>
              </div>
              <div className="banner">
                <h2> Endangered Status</h2>
                <p>{animalDetails.facts["Endangered Status"]}</p>
                <button
                  onClick={() => {
                  console.log("Opening URL:", animalDetails.donationURL);
                  window.open(animalDetails.donationURL, "_blank", "noopener,noreferrer");
                  }}
                  >
                  HELP NOW!
                </button>
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
