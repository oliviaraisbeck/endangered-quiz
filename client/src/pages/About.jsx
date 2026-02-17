import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/About.css';
import text from '../data/about.json';

const About = () => {
    return (
      <div className="container">
        <div className="content-about">
          <h1 className="title">About the Quiz</h1>
          <p>{ text.description}</p>
        </div>
        <div className="banner">
          { text.banner1 }
        </div>
        <div className="content-about">
          <h2>Methodology</h2>
          <p>{text.methodology}</p>
          <h2>Predation / Organization</h2>
          <p>{text.po}</p>
          <h2>Social Behavior / Community</h2>
          <p>{text.sbc}</p>
          <h2>Environment Behavior / Extroversion</h2>
          <p>{text.ebe}</p>
          <h2>Migration / Exploration</h2>
          <p>{text.me}</p>
          <h2>Food Chain / Confidence</h2>
          <p>{text.fcc}</p>
          <h2>Animals that Don’t Quite Fit</h2>
          <p>{text.dont_fit}</p>
          <h2>Quiz Influences</h2>
          <p>{text.influence}</p>
        </div>
      </div>
    );
  };
  
  export default About;
