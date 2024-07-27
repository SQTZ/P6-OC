import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout';
import Lightbox from '../components/Lightbox';
import Formulary from '../components/Formulary';

// Fonctionnalité principale du photographe
function Photographer() {
    const { id } = useParams();
    const [photographer, setPhotographer] = useState(null);
    const [media, setMedia] = useState([]);
    const [sortOption, setSortOption] = useState('likes');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isFormularyOpen, setIsFormularyOpen] = useState(false);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);
    const [likedMedia, setLikedMedia] = useState(new Set()); // État pour suivre les médias likés

    // Réference pour la vidéo
    const videoRef = useRef(null);

    // Calcul du total des likes pour toutes les médias
    const totalLikes = media.reduce((sum, item) => sum + item.likes, 0);

    // Effet pour charger les données du photographe et ses médias
    useEffect(() => {
        async function fetchPhotographer() {
            try {
                const response = await fetch('../data/photographers.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const photographerData = data.photographers.find(p => p.id === parseInt(id));
                setPhotographer(photographerData);
                setMedia(data.media.filter(m => m.photographerId === parseInt(id)));
            } catch (e) {
                console.error('Could not load photographer data:', e);
            }
        }

        fetchPhotographer();
    }, [id]);

    if (!photographer) {
        return <div>Loading...</div>;
    }

    const { name, portrait, city, country, tagline } = photographer;
    const picture = `../assets/photographers/${portrait}`;

    // Gestion du changement de tri
    const handleSortChange = (option) => {
        setSortOption(option);
        setIsDropdownOpen(false);
    };

    // Tri des médias en fonction de l'option sélectionnée
    const sortedMedia = [...media].sort((a, b) => {
        if (sortOption === 'likes') {
            return b.likes - a.likes;
        } else if (sortOption === 'date') {
            return new Date(b.date) - new Date(a.date);
        } else if (sortOption === 'title') {
            return a.title.localeCompare(b.title);
        } else {
            return 0;
        }
    });

    // Fonction pour incrémenter les likes d'un média
    const incrementLikes = (id) => {
        if (!likedMedia.has(id)) { // Vérifie si le média a déjà été liké
            setMedia((prevMedia) => {
                const newMedia = prevMedia.map((item) => {
                    if (item.id === id) {
                        return { ...item, likes: item.likes + 1 };
                    }
                    return item;
                });
                return newMedia;
            });
            setLikedMedia(new Set(likedMedia).add(id)); // Ajoute l'ID du média liké
        }
    };

    // Options de tri disponibles
    const sortOptions = [
        { value: 'likes', label: 'Popularité' },
        { value: 'date', label: 'Date' },
        { value: 'title', label: 'Titre' }
    ];

    // Ouvrir ou fermer la lightbox
    const openLightbox = (index) => {
        setSelectedMediaIndex(index);
        setIsLightboxOpen(true);
    };

    
    const closeLightbox = () => {
        setIsLightboxOpen(false);
        setSelectedMediaIndex(null);
        if (videoRef.current) {
            videoRef.current.pause(); // Vidéo en pause
            videoRef.current.currentTime = 0; // Je renitialise ma vidéo au début
        }
    };

    // Ouvrir ou fermer le formulaire
    const openFormulary = () => {
        setIsFormularyOpen(true);
    };

    const closeFormulary = () => {
        setIsFormularyOpen(false);
    };

    // Navigation dans la lightbox
    const showNextMedia = () => {
        setSelectedMediaIndex((prevIndex) => (prevIndex + 1) % sortedMedia.length);
    };

    const showPrevMedia = () => {
        setSelectedMediaIndex((prevIndex) => (prevIndex - 1 + sortedMedia.length) % sortedMedia.length);
    };

    return (
        <div>

            <Layout />

            <main>

                <section className='photograph-header'>

                    <div>

                        <h2>{name}</h2>

                        <h3>{city}, {country}</h3>

                        <p>{tagline}</p>

                    </div>

                    <button className='contact_button' onClick={openFormulary} aria-label='Contact Me' tabIndex="0">Contactez-moi</button>

                    <img src={picture} alt={name} />

                </section>

                <section className='sort-menu'>

                    <label htmlFor="sort">Trier par: </label>

                    <div className="custom-dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)} aria-label='Order by' tabIndex="0" role="button" aria-haspopup="true" aria-expanded={isDropdownOpen} onKeyPress={(e) => e.key === 'Enter' && setIsDropdownOpen(!isDropdownOpen)}>

                        <div className="custom-dropdown-selected" role="combobox" aria-expanded={isDropdownOpen}>
                            {sortOptions.find(option => option.value === sortOption).label}

                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-down" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 9l6 6l6 -6" />
                            </svg>

                        </div>

                        {isDropdownOpen && (

                            <div className="custom-dropdown-options" role="listbox">

                                {sortOptions.filter(option => option.value !== sortOption).map(option => (

                                    <div key={option.value} role="option" onClick={() => handleSortChange(option.value)} tabIndex="0" onKeyPress={(e) => e.key === 'Enter' && handleSortChange(option.value)}>
                                        {option.label}
                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </section>


                <section className='media-section'>

                    {sortedMedia.map((item, index) => (

                        <article key={item.id} className='media-item'>

                            {item.image ? (

                                <img src={`../assets/images/${item.image}`} alt={item.title} onClick={() => openLightbox(index)} aria-label='Lilac breasted roller, closeup view' tabIndex="0" onKeyPress={(e) => e.key === 'Enter' && openLightbox(index)} />

                            ) : (

                                <video ref={videoRef} controls={isLightboxOpen} onClick={() => openLightbox(index)} aria-label='Lilac breasted roller, closeup view' tabIndex="0" onKeyPress={(e) => e.key === 'Enter' && openLightbox(index)}>
                                    <source src={`../assets/images/${item.video}`} poster={`../assets/images/${item.video.split('.')[0]}.jpg`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

                            )}

                            <div className='media-text'>

                                <h2>{item.title}</h2>

                                <p>{item.likes}

                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => incrementLikes(item.id)} className="icon icon-tabler icon-tabler-heart-filled" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-label='likes' tabIndex="0" onKeyPress={(e) => e.key === 'Enter' && incrementLikes(item.id)}>
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" stroke-width="0" fill="currentColor" />
                                </svg>
                                
                                </p>

                            </div>

                        </article>

                    ))}

                </section>


                <section className='about-photographer'>

                    <div className='text'>

                        <p>{totalLikes}</p>

                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" stroke-width="0" fill="currentColor" />
                        </svg>

                    </div>

                    <p>{photographer.price}€/jour</p>

                </section>

                {isLightboxOpen && (
                    <Lightbox
                        media={sortedMedia[selectedMediaIndex]}
                        onClose={closeLightbox}
                        onPrev={showPrevMedia}
                        onNext={showNextMedia}
                    />
                )}

                {isFormularyOpen && (
                    <Formulary onClose={closeFormulary} photographer={photographer} />
                )}

            </main>
            
        </div>
    );
}

export default Photographer;