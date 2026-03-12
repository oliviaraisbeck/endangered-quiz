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
            <div key={index}>
              <div className="animal-item">
                <div className="animal-text">
                  <h2>{animal.name}</h2>
                  <p className="animal-description">{animal.description}</p>
                  <p className="animal-general-fact">{animal.facts["General Facts"]}</p>
                  {animal.traits && animal.traits.length > 0 && (
                    <p>Traits: {animal.traits.join(", ")}
                    </p>
                  )}
                  <p className="learn-more" onClick={() => goToAnimalPage(animal.name)}>
                      Learn More →
                    </p>
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
              <hr className="animal-divider" />
            </div>
            
          ))} 
          
        </div>

      </div>
    </div>
  );
};

export default Animals;
