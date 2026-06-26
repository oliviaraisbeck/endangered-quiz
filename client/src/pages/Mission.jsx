import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Mission.css';
import text from '../data/mission.json';

//delete later
const importAllAnimals = () => {
  const context = require.context('../data/animals', false, /\.json$/);
  return context.keys().map(context);
};

const animals = importAllAnimals();

//end delete

const Mission = () => {
    return (
      <div className="container">
        <div className="content-mission">
          <h1 className="title">Mission</h1>
          <p>{ text.description}</p>
        </div>
        <div className="banner">
          { text.banner1 }
        </div>
        <div className="content-mission">
          <p>{ text.description2}</p>
        </div>

        <div className="animals-grid lower-padding">
            {animals.map((animal, index) => (
              <div key={index} className="animal-section">
                <div className="endangered-sm">
                  <img src={animal.logo} alt={animal.name} className="endangered-img" style={{background: "#5895bb"}}/>
                </div>
                <h3>{animal.name}</h3>
                <div>
                  <img src={animal.logo} alt={animal.name} className="endangered-img" style={{background: "#96c97c"}}/>
                </div>
                <h3>{animal.name}</h3>
                <div>
                  <img src={animal.logo} alt={animal.name} className="endangered-img" style={{background: "#9ad2db"}}/>
                </div>
                <h3>{animal.name}</h3>
                <div>
                  <img src={animal.logo} alt={animal.name} className="endangered-img" style={{background: "#d54f53"}}/>
                </div>
                <h3>{animal.name}</h3>
                <div>
                  <img src={animal.logo} alt={animal.name} className="endangered-img" style={{background: "#b46441"}}/>
                </div>
                <h3>{animal.name}</h3>
              </div>
            ))}
          </div>
      </div>
    );
  };
  
  export default Mission;
