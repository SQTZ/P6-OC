import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Définition du composant Lightbox
const Lightbox = ({ media, onClose, onPrev, onNext }) => {
    const videoRef = useRef(null);

    // Utilisation de useEffect pour écouter les événements clavier
    useEffect(() => {
        // Fonction pour gérer les événements clavier
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                onNext();
            } else if (event.key === 'ArrowLeft') {
                onPrev();
            } else if (event.key === 'Escape') {
                onClose();
            } else if (event.key === ' ') {
                // Espace pour lecture/pause de la vidéo
                if (videoRef.current) {
                    if (videoRef.current.paused) {
                        videoRef.current.play();
                    } else {
                        videoRef.current.pause();
                    }
                }
            }
        };

        // Ajout de l'écouteur d'événements clavier
        window.addEventListener('keydown', handleKeyDown);

        // Fonction de nettoyage pour retirer l'écouteur d'événements clavier
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onNext, onPrev, onClose]);

    // Fonctions pour gérer les actions de fermeture, de prochain et de précédent
    const handleClose = () => {
        onClose();
    };

    const handleNext = () => {
        onNext();
    };

    const handlePrev = () => {
        onPrev();
    };

    return (
        <main className="lightbox-modal" aria-label="image closeup view">
            <div className="lightbox-close" aria-label="Close dialog">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleClose}
                    className="icon icon-tabler icon-tabler-x"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#901C1C"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                </svg>
            </div>

            <div className="lightbox-content">
                <div aria-label="Previous image">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handlePrev}
                        className="icon icon-tabler icon-tabler-chevron-left"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#000000"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 6l-6 6l6 6" />
                    </svg>
                </div>

                <div>
                    {media.image ? (
                        <img
                            src={`../assets/images/${media.image}`}
                            alt={media.title}
                            aria-label="Lilac breasted roller"
                        />
                    ) : (
                        <video
                            controls
                            aria-label="Lilac breasted roller"
                            ref={videoRef}
                        >
                            <source
                                src={`../assets/images/${media.video}`}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    )}

                    <div className="lightbox-caption">
                        <h2>{media.title}</h2>
                    </div>
                </div>

                <div aria-label="Next image">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleNext}
                        className="icon icon-tabler icon-tabler-chevron-right"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#000000"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 6l6 6l-6 6" />
                    </svg>
                </div>
            </div>
        </main>
    );
};

// Définition des propTypes pour Lightbox
Lightbox.propTypes = {
    media: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
};

export default Lightbox;
