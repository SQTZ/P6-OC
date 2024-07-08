import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Lightbox = ({ media, onClose, onPrev, onNext }) => {

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                onNext();
            } else if (event.key === 'ArrowLeft') {
                onPrev();
            } else if (event.key === 'Enter') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Nettoyage de l'écouteur d'événement lors du démontage du composant
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onNext, onPrev, onClose]);

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
        <main className="lightbox-modal">
            <div className='lightbox-close'>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={handleClose} className="icon icon-tabler icon-tabler-x" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#901C1C" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                </svg>
            </div>
            <div className="lightbox-content">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handlePrev} className="icon icon-tabler icon-tabler-chevron-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 6l-6 6l6 6" />
                    </svg></div>
                <div>
                    {media.image ? (
                        <img src={`../assets/images/${media.image}`} alt={media.title} />
                    ) : (
                        <video controls>
                            <source src={`../assets/videos/${media.video}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                    <div className="lightbox-caption">
                        <h2>{media.title}</h2>
                    </div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleNext} className="icon icon-tabler icon-tabler-chevron-right" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 6l6 6l-6 6" />
                    </svg></div>
            </div>
        </main>
    );
};

Lightbox.propTypes = {
    media: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
};

export default Lightbox;