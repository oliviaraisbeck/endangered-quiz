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

      <h2>Understand Your Results</h2>
      {animalDetails.understandResult.map((line, index) => (
        <p key={index}>{line}</p>
      ))}

      <h2>Facts</h2>
      <ul>
        {Object.entries(animalDetails.facts).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>

      <h2>Sources</h2>
      <ul>
        {animalDetails.sources.map((src, idx) => (
          <li key={idx}>
            <a href={src} target="_blank" rel="noreferrer">{src}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalPage;
