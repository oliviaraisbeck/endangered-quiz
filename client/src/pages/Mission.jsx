import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Mission.css';
import text from '../data/mission.json';

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
      </div>
    );
  };
  
  export default Mission;
