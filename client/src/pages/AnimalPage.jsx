import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/AnimalPage.css';
import animalTypes from "../data/animals.json";

const AnimalPage = () => {
  const navigate = useNavigate();
  const [flippedCards, setFlippedCards] = useState({});
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
    { key: "VU", label: "Vulnerable" },
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

  const traitDirectionMap = {
    "Social Behavior": {
      "AC": "left",
      "RE": "right"
    },
    "Environment Behavior": {
      "AC": "right",
      "RE": "left"
    },
    "Migration": {
      "MOB": "right",
      "IDL": "left"
    },
    "Neuroticism": {
      "AC": "right",
      "RE": "left"
    },
    "Class of P/Q": {
      "PT/QF": "right",
      "QL/QU": "left"
    }
  };

  const factEntries = Object.entries(animalDetails.facts || {}).filter(
    ([key]) =>
      key !== "Physical Description" &&
      key !== "General Facts"
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
        <div className="animal-header-page lower-padding">
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

        <h2 className="left">About the {animalDetails.name}</h2>
        <p className="left lower-padding">{animalDetails.facts["General Facts"]} {animalDetails.facts["Physical Description"]}</p>
        <div className="personality-section lower-padding">
          <div className="nickname-section left">
            <h2 className="our-animal-title bold">"The {animalDetails.title}"</h2>
            <h2>Why this nickname?</h2>
            <p>{animalDetails.why}</p>
            <button className="button1" onClick={() => navigate('/quiz')}>Take The Quiz</button>
          </div>
          <div className="animal-page-bars">
            {animalDetails.understandResult?.map((item, index) => {
              const labels = traitLabels[item.key] || { left: "Left", right: "Right" };

              const traitCode = animalTypes[animalDetails.name][item.key]; 
              const value = traitDirectionMap[item.key]?.[traitCode];

              return (
                <div className="bar-container" key={index}>
                  <div className="bar"></div>

                  <div className="bar-floating-title">
                    {item.title}
                  </div>
                  
                  <div className="bar-labels">
                    <span className={value === "left" ? "active-label" : ""}>
                      {labels.left}
                    </span>

                    <span className={value === "right" ? "active-label" : ""}>
                      {labels.right}
                    </span>
                  </div>

                  <div className={`arrow-wrapper ${value}`}>
                    <div className="arrow" />
                  </div>

                  <div className="bar-description">
                    {item.text}
                  </div>

                </div>
              );
            })}
          </div>
        </div>              
        <section className="facts-section">
          <h2>More About the {animalDetails.name}</h2>

          <div className="facts-two-column">
            <div className="facts-column">
              {factEntries
                .slice(0, Math.ceil(factEntries.length / 2))
                .map(([title, text], index) => {
                  const isOpen = flippedCards[index];

                  return (
                    <div
                      key={title}
                      className={`fact-card color-${index % 7}`}
                      onClick={() =>
                        setFlippedCards(prev => ({
                          ...prev,
                          [index]: !prev[index]
                        }))
                      }
                    >
                      <h3>{title}</h3>

                      <div className="fact-content">
                        {isOpen && <p>{text}</p>}
                      </div>

                      <div className="fact-arrow">
                        {isOpen ? "▲" : "▼"}
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="facts-column">
              {factEntries
                .slice(Math.ceil(factEntries.length / 2))
                .map(([title, text], index) => {
                  const realIndex = index + Math.ceil(factEntries.length / 2);
                  const isOpen = flippedCards[realIndex];

                  return (
                    <div
                      key={title}
                      className={`fact-card color-${realIndex % 6}`}
                      onClick={() =>
                        setFlippedCards(prev => ({
                          ...prev,
                          [realIndex]: !prev[realIndex]
                        }))
                      }
                    >
                      <h3>{title}</h3>

                      <div className="fact-content">
                        {isOpen && <p>{text}</p>}
                      </div>

                      <div className="fact-arrow">
                        {isOpen ? "▲" : "▼"}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
        
        {/*
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
        */}
      </div>
      <div className="banner endangered-banner">
          <div className="endangered-info">
            <div className='endangered-sm'>
              <img className="endangered-img" src={animalDetails.logo} alt={animalDetails.name} style={{background: animalDetails.color}}/>
            </div>
            <div className="endangered-status">
              <h2>Endangered Status</h2>
              <p>{animalDetails.facts["Endangered Status"]}</p>
              <h2>How to Help</h2>
              <p>{animalDetails.charityDesc}</p>
              <button
                onClick={() => {
                console.log("Opening URL:", animalDetails.donationURL);
                window.open(animalDetails.donationURL, "_blank", "noopener,noreferrer");
                }}
                >
                HELP NOW!
              </button>
            </div>
            <div className='endangered-sm'>
              <img className="endangered-img" src={animalDetails.image} alt={animalDetails.name} />
            </div>
          </div>
        </div>
    </div>
  );
};

export default AnimalPage;
