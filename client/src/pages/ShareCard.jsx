
import '../styles/ShareCard.css';
import React, { forwardRef } from "react";

const traitRanges = {
  "Class of P/Q": { min: 10, max: 50 },
  "Social Behavior": { min: 5, max: 25 },
  "Environment Behavior": { min: 5, max: 25 },
  "Migration": { min: 5, max: 25 },
  "Neuroticism": { min: 5, max: 25 }
};

const traitLabels = {
  "Class of P/Q": {
    left: "Adaptable",
    right: "Organized"
  },
  "Social Behavior": {
    left: "Family First",
    right: "Independent"
  },
  "Environment Behavior": {
    left: "Introvert",
    right: "Extrovert"
  },
  "Migration": {
    left: "Fact-Forward",
    right: "Open-Minded"
  },
  "Neuroticism": {
    left: "Introspective",
    right: "Confident"
  }
  };

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

const ShareCard = forwardRef(({ animal, scores }, ref) => {
  return (
    <div ref={ref} className="share-card" style={{background: `rgba(${hexToRgb(animal.color)}, 0.1)`}}>
        <h1 className="share-text share-margin">{animal.name}</h1>
        <h1 className="polaroid-title bold share-text" style={{color: animal.color}}>« The {animal.title} »</h1>
        <div className="share-traits">
            <div className="share-image-wrapper" style={{background: animal.color}}>
                <img src={animal.logo} alt={animal.name} className="share-image"/>
            </div>
        </div>
        <div className="understand-bars-share">
            {animal.understandResult.map((item, index) => {
                const score = scores[item.key] || 0;
                const range = traitRanges[item.key];

                const percent = range
                ? ((score - range.min) / (range.max - range.min)) * 100
                : 0;

                const percentClamped = Math.min(100, Math.max(0, percent));

                return (
                    <div key={index}>
                        <div className="bar-container">
                            <div className="bar-share" />
                            <div className="bar-floating-title-share">
                                <span className={percentClamped<=50 ? "active-label-share" : ""}>{traitLabels[item.key]?.left}</span>
                                <span className={percentClamped>50 ? "active-label-share" : ""}>{traitLabels[item.key]?.right}</span>
                            </div>
                            <div
                              className="arrow-wrapper-share"
                              style={{ left: `${percentClamped}%` }}
                            >
                              <span className="arrow-label-share">
                                {Math.round(percentClamped)}%
                              </span>
                              <div className="arrow-share" />
                            </div>
                        </div>

                        <div className="bar-labels">
                        
                        </div>
                    </div>
                );
            })}
        </div>
        <div className="likes-dislikes">
            <p className="ld-item" style={{ border: `5px solid ${animal.color}` , background: `rgba(${hexToRgb(animal.color)}, 0.15)`}}>
                <span className="bold">Likes </span>
                <br></br>
                <ul className="small-text left">{animal.likes?.map(like => (<li key={like}>{like}</li>
                ))}</ul>
            </p>
            <p className="ld-item" style={{ border: `5px solid ${animal.color}` , background: `rgba(${hexToRgb(animal.color)}, 0.15)`}}>
                <span className="bold">Dislikes</span>
                <br></br>
                <ul className="small-text left">{animal.dislikes?.map(like => (<li key={like}>{like}</li>
                ))}</ul>
            </p>
        </div>


    </div>
  );
});

export default ShareCard;
  
