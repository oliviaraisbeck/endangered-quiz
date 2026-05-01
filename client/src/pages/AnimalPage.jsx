import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/AnimalPage.css';
import animalTypes from "../data/animals.json";

const AnimalPage = () => {
  const navigate = useNavigate();
  const { animalKey } = useParams(); 
  const [animalDetails, setAnimalDetails] = useState(null);
  const animalNames = Object.keys(animalTypes).sort();
  const fileKeys = animalNames.map((name) =>
    name.replace(/ /g, "_")
  );
  const currentIndex = fileKeys.indexOf(animalKey);
  const nextAnimal =
  currentIndex !== -1
    ? fileKeys[(currentIndex + 1) % fileKeys.length]
    : fileKeys[0];

  useEffect(() => {
    import(`../data/animals/${animalKey}.json`)
      .then(module => setAnimalDetails(module.default))
      .catch(err => console.error(err));
  }, [animalKey]);

  if (!animalDetails) return <p>Loading...</p>;

  const statusOptions = [
    { key: "DD", label: "Data Deficient" },
    { key: "V", label: "Vulnerable" },
    { key: "NE", label: "Near Endangered" },
    { key: "EN", label: "Endangered" },
    { key: "CR", label: "Critically Endangered" }
  ];

  const traitLabels = {
  "Class of P/Q": {
    left: "Organized",
    right: "Adaptable"
  },
  "Social Behavior": {
    left: "Family First",
    right: "Independent"
  },
  "Environment Behavior": {
    left: "Extrovert",
    right: "Introvert"
  },
  "Migration": {
    left: "Open-minded",
    right: "Fact-forward"
  },
  "Neuroticism": {
    left: "Confident",
    right: "Introspective"
  }
  };

  const factEntries = Object.entries(animalDetails.facts || {}).filter(
    ([key]) =>
      key !== "Physical Description" 
  );

  return (
    <div className="container">
      <div className="animal-top-nav">
        <button
          className="nav-button"
          onClick={() => navigate("/animals")}
        >
          ← All Animals
        </button>

        <button
          className="nav-button button1"
          onClick={() => navigate(`/animals/${nextAnimal}`)}
        >
          Next Animal →
        </button>
      </div>
      <div className="page-content">
        <div className="animal-header section">
          <div className="animal-header-text">
            <h1>{animalDetails.name}</h1>
            <p>{animalDetails.description}</p>
            <div className="status-section">
              <p className="status-title">Conservation Status</p>

              <div className="status-scale">
                {statusOptions.map((item) => {
                  const isActive = animalDetails.status === item.key;

                  return (
                    <div className="status-item" key={item.key}>
                      <div className={`status-circle ${item.key} ${isActive ? "active" : ""}`}>
                        {item.key}
                      </div>
                      <p className="status-label">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="animal-header-image">
            <img src={animalDetails.image} alt={animalDetails.name} />
          </div>
        </div>

        <h2>About the {animalDetails.name}</h2>
        <p>{animalDetails.facts["Physical Description"]}</p>
        <div className="personality-section">
          <div className="nickname-section">
            <h2>{animalDetails.title}</h2>

            <h3>Why this nickname?</h3>
            <p>{animalDetails.why}</p>
            <button className="button1" onClick={() => navigate('/quiz')}>Take The Quiz</button>
          </div>
          <div className="trait-sliders-section">
            {animalDetails.understandResult?.map((item, index) => {
              const labels = traitLabels[item.key] || { left: "Left", right: "Right" };

              return (
                <div className="trait-slider-card" key={index}>
                  <div className="trait-header">
                    <span>{labels.left}</span>
                    <span>{labels.right}</span>         
                  </div>
                  <div className="slider-track">
                    <div className="slider-indicator left"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <section className="facts-section">
          <h2>More About This Species</h2>

          <div className="facts-grid">
            {factEntries.map(([title, text], index) => (
              <div className="fact-card" key={index}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
      
        <div id="Donation">
          <h2>Help the {animalDetails.name}</h2>
          <p>{animalDetails.charityDesc}</p>
          <button
              onClick={() => {
              console.log("Opening URL:", animalDetails.donationURL);
              window.open(animalDetails.donationURL, "_blank", "noopener,noreferrer");
          }}
              >
              Donate Now
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default AnimalPage;
