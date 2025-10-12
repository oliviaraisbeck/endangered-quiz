import React from 'react';
import '../styles/Results.css'; 
import { useNavigate } from 'react-router-dom';

const Results = () => {
    return (
        <div className="container">
          <h1 className="title">Results go here</h1>
          <div>
            <span>P/Q </span>
            <span>05</span>
          </div>
          <div>
            <span>Social </span>
            <span>05</span>
          </div>
          <div>
            <span>Environmantal </span>
            <span>05</span>
          </div>
          <div>
            <span>Migrat </span>
            <span>05</span>
          </div>
          <div>
            <span>Neuro </span>
            <span>05</span>
          </div>
        </div>
      );
};

export default Results;