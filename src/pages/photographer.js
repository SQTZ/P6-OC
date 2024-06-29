import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout';

function Photographer() {
    const { id } = useParams();
    const [photographer, setPhotographer] = useState(null);
    const [media, setMedia] = useState([]);
    const [sortOption, setSortOption] = useState('likes');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    const handleSortChange = (option) => {
        setSortOption(option);
        setIsDropdownOpen(false);
    };

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

    const sortOptions = [
        { value: 'likes', label: 'Popularité' },
        { value: 'date', label: 'Date' },
        { value: 'title', label: 'Titre' }
    ];

    return (
        <div>
            <Layout />
            <main>
                <div className='photograph-header'>
                    <div>
                        <h1>{name}</h1>
                        <h3>{city}, {country}</h3>
                        <p>{tagline}</p>
                    </div>

                    <button className='contact_button'>Contactez-moi</button>

                    <img src={picture} alt={name} />
                </div>

                <div className='sort-menu'>
                    <label htmlFor="sort">Trier par: </label>
                    <div className="custom-dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <div className="custom-dropdown-selected">{sortOptions.find(option => option.value === sortOption).label} </div>
                        {isDropdownOpen && (
                            <div className="custom-dropdown-options">
                                {sortOptions.filter(option => option.value !== sortOption).map(option => (
                                    <div key={option.value} onClick={() => handleSortChange(option.value)}>
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className='media-section'>
                    {sortedMedia.map((item) => (
                        <div key={item.id} className='media-item'>
                            <img src={`../assets/images/${item.image}`} alt={item.title} />
                            <div className='media-text'>
                                <h2>{item.title}</h2>
                                <p>{item.likes} <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" stroke-width="0" fill="currentColor" />
                                </svg></p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Photographer;
