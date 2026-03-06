import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Homepage.css';

const importAllAnimals = () => {
  const context = require.context('../data/animals', false, /\.json$/);
  return context.keys().map(context);
};

const animals = importAllAnimals();

const shuffleArray = (array) => {
  const arr = [...array]; // copy array so original is not mutated
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const HomePage = () => {
  const navigate = useNavigate();
  const bannerImage = "/images/tiger.jpg";
  const goToAnimalPage = (name) => {
    navigate(`/animals/${name.replace(/\s+/g, "_")}`);
  };
  const shuffledAnimals = shuffleArray(animals);

  return (
    <div className="container">
      <div className="banner-home">
        <img src={bannerImage} alt="Banner" className="banner-image" />
        <div className="banner-text">
          <div className="stats">
            <div className="stat-line">
              <h1>32 Animals</h1>
            </div>
            <div className="stat-line">
              <h1>18 Causes</h1>
            </div>
            <div className="stat-line">
              <h1>7 Minutes</h1>
            </div>
          </div>
          <button onClick={() => navigate('/quiz')}>
            Which Endangered <br /> Animal Are You
          </button>
        </div>
      </div>
      <div className="about">
        <h2>About Your Animal Ally</h2>
        <p>The Animal Ally Quiz matches your unique traits with one of 32 endangered animals. Take the quiz to find out more about yourself, and how you can make a difference for your critter.  </p>
        <button className="button1" onClick={() => navigate('/quiz')}>Take The Quiz</button>
        <p className="learn-more" onClick={() => navigate("/about") } >
          Learn More →
        </p>
      </div>
      <div className="our-animals">
        <h2>Our Animals</h2>
        <p>Every critter on this quiz needs our help, whether they have a current population of seven or are the biggest surviving land mammal.</p>
          <div className="animals-grid">
            {shuffledAnimals.map((animal, index) => (
              <div key={index} className="animal-section">
                <img src={animal.image} alt={animal.name} className="animal-logo" />
                <h3>{animal.name}</h3>
                <p className="learn-more" onClick={() => goToAnimalPage(animal.name)}>
                  Learn More →
                </p>
              </div>
            ))}
          </div>
      </div>
      <div className="mission">

      </div>
    </div>
  );
};

export default HomePage;
