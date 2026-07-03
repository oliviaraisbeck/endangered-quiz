
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

const traitsLine = categoryScores
  ? [
      getTraitLabel("Class of P/Q", categoryScores["Class of P/Q"]),
      getTraitLabel("Social Behavior", categoryScores["Social Behavior"]),
      getTraitLabel("Environment Behavior", categoryScores["Environment Behavior"]),
      getTraitLabel("Migration", categoryScores["Migration"]),
      getTraitLabel("Neuroticism", categoryScores["Neuroticism"]),
    ].join(" · ")
  : "";

const ShareCard = forwardRef(({ animal, scores }, ref) => {
  return (
    <div ref={ref} className="share-card">
        <h1>{animal.name}</h1>
        <div className="share-traits">
            <img src={animal.logo} alt={animal.name} className="share-image"/>
            <p> {animal.traits?.join(", ")}</p>
        </div>
        <h1 className="polaroid-title bold">The {animal.title}</h1>
        <p>{traitsLine}</p>
        <div className="likes-dislikes">
            <p>Likes: {animal.likes?.join(", ")}</p>
            <p>Dislikes: {animal.dislikes?.join(", ")}</p>
        </div>


    </div>
  );
});

export default ShareCard;
  
