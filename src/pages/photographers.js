import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';

function Photographers() {
  const [photographers, setPhotographers] = useState([]);

  useEffect(() => {
    async function fetchPhotographers() {
      try {
        const response = await fetch('./data/photographers.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPhotographers(data.photographers);
      } catch (e) {
        console.error('Could not load photographers data:', e);
      }
    }

    fetchPhotographers();
  }, []);

  // Fonction pour créer une carte de photographe en JSX
  function PhotographerCard({ photographer }) {
    const { name, id, portrait, city, country, tagline, price } = photographer;
    const picture = `assets/photographers/${portrait}`;
    const profileURL = `/photographer/${id}`;

    return (
      <article>
        <a href={profileURL}><img src={picture} alt={name} /></a>
        <h2>{name}</h2>
        <h3>{city}, {country}</h3>
        <p>{tagline}</p>
        <span>{price}€/jour</span>
      </article>
    );
  }

  return (
    <div>
        <Layout/>
      <main>
        <section className="photographer_section">
          {photographers.map((photographer, index) => (
            <PhotographerCard key={index} photographer={photographer} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Photographers;
