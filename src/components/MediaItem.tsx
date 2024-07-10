import React, { useState } from 'react';
import Modal from './Modal.tsx';
import { MediaItem } from '../types.ts';

// Define the props for the MediaItemComponent
interface MediaItemProps {
    item: MediaItem; // Media item to be displayed
    mediaType: 'movie' | 'tv' | 'anime'; // Type of media
    darkMode: boolean; // Boolean to indicate if dark mode is enabled
}

// Functional component to display a single media item
const MediaItemComponent: React.FC<MediaItemProps> = ({ item, mediaType, darkMode }) => {
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    const handleItemClick = () => setShowModal(true); // Function to handle item click and show modal
    const handleCloseModal = () => setShowModal(false); // Function to handle closing the modal

    return (
        <>
            <div className="col" onClick={handleItemClick} style={{ cursor: 'pointer' }}>
                <div className="card h-100">
                    <div className={`position-absolute top-0 start-0 px-2 py-1 ${mediaType}-label`}>
                        {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
                    </div>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        className="card-img-top"
                        alt={item.title || item.name}
                    />
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{item.title || item.name}</h5>
                        <p className="card-text">{item.overview}</p>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onClose={handleCloseModal} item={item} darkMode={darkMode} /> {/*Render modal if showModal is true*/}
        </>
    );
};

export default MediaItemComponent;
