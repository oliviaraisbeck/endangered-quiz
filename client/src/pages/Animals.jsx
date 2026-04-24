import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Animals.css';

const importAllAnimals = () => {
  const context = require.context('../data/animals', false, /\.json$/);
  return context.keys()
    .map(key => {
      const data = context(key);
      return data && data.default ? data.default : data;
    })
    .filter(Boolean);
};

const Animals = () => {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const loadedAnimals = importAllAnimals();
    setAnimals(loadedAnimals);
  }, []);

  const goToAnimalPage = (name) => {
    const urlName = name.replace(/\s+/g, "_");
    navigate(`/animals/${urlName}`);
  };

  return (
    <div className="container">
      <div className="animal-container">
        <h1 className="title">Our Animals</h1>
        <div className="animals-list">
          {animals.map((animal, index) => (
            <div className="animal-wrapper" key={index}>
              <div className="atitle">
                <h2 className="animal-name">{animal.name}</h2>
              <div className="animal-item">
                <div className="animal-text">
                  
                  <p className="animal-title">The {animal.title}</p>
                  <p className="animal-description">{animal.description}</p>
                  <button onClick={() => goToAnimalPage(animal.name)}>
                      Learn More →
                  </button>
                  {/*<p className="animal-description">{animal.charityDesc}</p>
                  <button 
                    className="button1 char-button" 
                    onClick={() => {
                    console.log("Opening URL:", animal.donationURL);
                    window.open(animal.donationURL, "_blank", "noopener,noreferrer");
                    }}>
                      Donate to {animal.charity}</button> */}
                </div>
                <div className="animal-image">
                  <img
                    src={animal.image.replace("client/src/", "/")}
                    alt={animal.name}
                    className="animal-thumb"
                  />
                  <div className="animal-logo-circle">
                    <img
                      src={animal.logo.replace("client/src/", "/")}
                      alt={`${animal.name} logo`}
                      className="animal-logo"
                    />
                  </div>
                </div> 
              </div>
              </div>
            </div>
            
          ))} 
          
        </div>

      </div>
    </div>
  );
};

export default Animals;
