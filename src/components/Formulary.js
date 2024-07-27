import { useState, useEffect, useRef } from 'react';

function Formulary({ onClose, photographer }) {
    const [successMessage, setSuccessMessage] = useState('');
    const modalRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = 'Votre message a été envoyé avec succès !';
        console.log(message);
        setSuccessMessage(message);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        const handleTabKey = (e) => {
            if (e.key === 'Tab') {
                const focusableModalElements = modalRef.current.querySelectorAll(
                    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]'
                );
                const firstElement = focusableModalElements[0];
                const lastElement = focusableModalElements[focusableModalElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keydown', handleTabKey);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keydown', handleTabKey);
        };
    }, [onClose]);

    useEffect(() => {
        const focusableElements = modalRef.current.querySelectorAll(
            'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]'
        );
        if (focusableElements.length) focusableElements[0].focus();
    }, []);

    return (
        <div className="bkg-modal" role="dialog" aria-labelledby="contact-me" aria-modal="true">
            <div className="modal" ref={modalRef}>
                <form onSubmit={handleSubmit} aria-label="Contact Form">
                    <header>
                        <h2 id="formulary-title">Contactez-moi<br />{photographer.name}</h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={onClose}
                            className="icon icon-tabler icon-tabler-x"
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#fff"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            role="button"
                            aria-label="Close Contact form"
                            tabIndex="0"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </header>
                    <div>
                        <label htmlFor="first-name">Prénom</label>
                        <input type="text" id="first-name" aria-label="First name" tabIndex="1" />
                    </div>
                    <div>
                        <label htmlFor="last-name">Nom</label>
                        <input type="text" id="last-name" aria-label="Last name" tabIndex="2" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" aria-label="Email" tabIndex="3" />
                    </div>
                    <div>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" aria-label="Your message" tabIndex="4" />
                    </div>
                    <button className="contact_button" type="submit" aria-label="Send" tabIndex="5">Envoyer</button>
                </form>
            </div>
        </div>
    );
}

export default Formulary;
