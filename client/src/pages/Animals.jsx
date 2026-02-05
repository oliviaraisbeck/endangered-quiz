import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Animals.css';

const importAllAnimals = () => {
  const context = require.context('../data/animals', false, /\.json$/);
  return context.keys().map(context);
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
    <div className="animals-container">
      <h1 className="title">Animals</h1>

      <div className="animals-list">
        {animals.map((animal, index) => (
          <div key={index} className="animal-item">
            
            <img
              src={animal.image.replace("client/src/", "/")}
              alt={animal.name}
              className="animal-thumb"
            />

            <div className="animal-text">
              <h2
                className="animal-name"
                onClick={() => goToAnimalPage(animal.name)}
              >
                {animal.name}
              </h2>

              <p className="animal-description">{animal.description}</p>
            </div>

            {/* line between animals */}
            {index !== animals.length - 1 && <hr className="animal-divider" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Animals;
