import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AnimalPage = () => {
  const { animalKey } = useParams(); 
  const [animalDetails, setAnimalDetails] = useState(null);

  useEffect(() => {
    import(`../data/animals/${animalKey}.json`)
      .then(module => setAnimalDetails(module.default))
      .catch(err => console.error(err));
  }, [animalKey]);

  if (!animalDetails) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{animalDetails.name}</h1>
      <img src={animalDetails.image} alt={animalDetails.name} />
      <p>{animalDetails.description}</p>

      <h2>Facts</h2>
      <ul>
        {Object.entries(animalDetails.facts).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
    
      <div id="Donation">
        <h2>Donation</h2>
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
  );
};

export default AnimalPage;
