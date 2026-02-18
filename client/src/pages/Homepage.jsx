import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Homepage.css';
import bannerImage from '../data/tiger.jpg';

const HomePage = () => {
  const navigate = useNavigate();

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
      <h1>About Your Animal Ally</h1>
      <p>The Animal Ally Quiz matches your unique traits with one of 32 endangered animals. Take the quiz to find out more about yourself, and how you can make a difference for your critter.  </p>
    </div>
  );
};

export default HomePage;
