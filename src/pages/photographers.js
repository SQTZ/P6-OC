import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';

// Fonctionnalité principale des photographes
function Photographers() {
  // État initial vide pour stocker les données des photographes
  const [photographers, setPhotographers] = useState([]);

  // Effet pour charger les données des photographes au montage du composant
  useEffect(() => {
    async function fetchPhotographers() {
      try {
        // Tentative de récupération des données des photographes
        const response = await fetch('./data/photographers.json');
        // Vérification de la réponse HTTP
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Extraction des données JSON de la réponse
        const data = await response.json();
        // Mise à jour de l'état avec les données des photographes
        setPhotographers(data.photographers);
      } catch (e) {
        // Log de l'erreur si la récupération échoue
        console.error('Could not load photographers data:', e);
      }
    }

    fetchPhotographers();
  }, []);

  // Composant pour afficher une carte de photographe
  function PhotographerCard({ photographer }) {
    const { name, id, portrait, city, country, tagline, price } = photographer;
    // Construction de l'URL de la photo et du profil du photographe
    const picture = `assets/photographers/${portrait}`;
    const profileURL = `/photographer/${id}`;

    return (
      <article aria-label='Mimi Keel'>
        
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
