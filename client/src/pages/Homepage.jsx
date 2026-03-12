import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Homepage.css';

const importAllAnimals = () => {
  const context = require.context('../data/animals', false, /\.json$/);
  return context.keys().map(context);
};

const animals = importAllAnimals();

const shuffleArray = (array) => {
  const arr = [...array]; 
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const HomePage = () => {
  const navigate = useNavigate();
  const bannerTiger = "/images/tiger.jpg";
  const bannerButterfly = "/images/migratory_monarch_butterfly.jpg"
  const donationLink = "https://support.nwf.org/page/89607/donate/1?ea.tracking.id=SRC&gclsrc=aw.ds&gad_source=1&gad_campaignid=23266753855&gbraid=0AAAAAD_rpHUnqMvZaNXTrvaOEU9V38Exe&gclid=CjwKCAiA8vXIBhAtEiwAf3B-gyjH2z63O97sbyanZx3g7-rT2EWko6wHTpw9cjWNqKSnDCeBu707DxoCOfsQAvD_BwE"
  
  const goToAnimalPage = (name) => {
    navigate(`/animals/${name.replace(/\s+/g, "_")}`);
  };
  const shuffledAnimals = shuffleArray(animals);

  return (
    <div className="home-container">
      <div className="banner-home">
        <img src={bannerTiger} alt="Banner" className="banner-image" />
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
        <h2 className="right"> About Your Animal Ally</h2>
        <p className="right">The Animal Ally Quiz matches your unique traits with one of 32 endangered animals. Take the quiz to find out more about yourself, and how you can make a difference for your critter.  </p>
        <div className="navs right">
          <button className="button1" onClick={() => navigate('/quiz')}>Take The Quiz</button>
          <p className="learn-more" onClick={() => navigate("/about") } >
            Learn More →
          </p>
        </div>
      </div>
      <div className="our-animals">
        <h2 className="right">Our Animals</h2>
        <p className="right">Every critter on this quiz needs our help, whether they have a current population of seven or are the biggest surviving land mammal.</p>
          <div className="animals-grid">
            {shuffledAnimals.map((animal, index) => (
              <div key={index} className="animal-section">
                <div className="animal-logo-wrapper">
                  <img src={animal.logo} alt={animal.name} className="animal-logo-home" />
                </div>
                <h3>{animal.name}</h3>
                <p className="learn-more" onClick={() => goToAnimalPage(animal.name)}>
                  Learn More →
                </p>
              </div>
            ))}
          </div>
      </div>
      <div className="mission-banner">
        <img src={bannerButterfly} alt="Banner" className="banner-image" />
        <div className="mission-text">
          <div className="stats">
            <div className="stat-line">
              <h1>Our Mission</h1>
            </div>
            <div className="mission-line">
              <h3>We pair individuals with an endangered species to inspire them to guarantee their animal’s survival.</h3>
            </div>
          </div>
          <div className="mission-buttons">
            <button onClick={() => navigate('/mission')}>
              Read More
            </button>
            <button className="button1" onClick={() => { //set as national wildlife organization idk if we want a different one? 
            window.open(donationLink, "_blank", "noopener,noreferrer");}}>
              HELP NOW!
            </button> 
          </div>
        </div>
      </div>
      <div className="partner-org">
        <h2>Partner Organizations</h2>
      </div>
      <div className="lower-banner">
        <h2>Work Cited Stuff</h2>
      </div>
    </div>
  );
};

export default HomePage;
