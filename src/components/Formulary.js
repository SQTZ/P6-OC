function Formulary({ onClose, photographer }) {
    return (
        <div className="bkg-modal">

            <div className="modal">

            <form>

                <header>

                    <h2>Contactez-moi<br />{photographer.name}</h2>

                    <svg xmlns="http://www.w3.org/2000/svg" onClick={onClose} className="icon icon-tabler icon-tabler-x" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                    </svg>

                </header>

                <div>

                    <label>Prénom</label>

                    <input type="text" />

                </div>

                <div>

                    <label>Nom</label>

                    <input type="text" />

                </div>

                <div>

                    <label>Email</label>

                    <input type="email" />

                </div>

                <div>

                    <label>Message</label>

                    <textarea />

                </div>

                <button className="contact_button" type="submit">Envoyer</button>

            </form>

        </div>
        
        </div>
    );
}

export default Formulary;