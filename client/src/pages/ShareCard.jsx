
import '../styles/ShareCard.css';
import React, { forwardRef } from "react";

const savedResults = localStorage.getItem("animalQuizResults");
const categoryScores = savedResults ? JSON.parse(savedResults) : null;

const getTraitLabel = (category, score) => {
  if (category === "Class of P/Q") {
    return score >= 30 ? "Organized" : "Adaptable";
  }

  if (category === "Social Behavior") {
    return score > 15 ? "Independent" : "Family First";
  }

  if (category === "Environment Behavior") {
    return score > 15 ? "Extrovert" : "Introvert";
  }

  if (category === "Migration") {
    return score > 15 ? "Open-Minded" : "Fact-Forward";
  }

  if (category === "Neuroticism") {
    return score > 15 ? "Confident" : "Introspective";
  }

  return "";
};

const ShareCard = forwardRef(({ animal, scores }, ref) => {
  return (
    <div ref={ref} className="share-card">
        <h1 className="share-text share-margin">{animal.name}</h1>
        <h1 className="polaroid-title bold share-text">AKA The {animal.title}</h1>
        <div className="share-traits">
            <div className="top-trait"> 
                <p className="trait-item-share" style={{background: animal.color}}>{getTraitLabel("Class of P/Q", categoryScores["Class of P/Q"])}</p>
                <p className="trait-item-share" style={{background: animal.color}}>{getTraitLabel("Social Behavior", categoryScores["Social Behavior"])}</p>
            </div>
            <div className="share-image-wrapper" style={{background: animal.color}}>
            </div>
            <div className="share-image-wrapper" style={{background: animal.color}}>
                <img src={animal.logo} alt={animal.name} className="share-image"/>
            </div>
            <div className="middle-trait">
                <p className="trait-item-share" style={{background: animal.color}}>{getTraitLabel("Neuroticism", categoryScores["Neuroticism"])}</p>
            </div>
            <div className="bottom-trait">
                <p className="trait-item-share" style={{background: animal.color}}>{getTraitLabel("Environment Behavior", categoryScores["Environment Behavior"])}</p>
                <p className="trait-item-share" style={{background: animal.color}}>{getTraitLabel("Migration", categoryScores["Migration"])}</p>               
            </div>
        </div>
        
        <div className="likes-dislikes">
            <p className="ld-item"><span className="bold">Likes </span><br></br>{animal.likes?.join(", ")}</p>
            <p className="ld-item"><span className="bold">Dislikes</span><br></br>{animal.dislikes?.join(", ")}</p>
        </div>


    </div>
  );
});

export default ShareCard;
  
