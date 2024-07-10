import React, { useState } from 'react';
import Modal from './Modal';
import { MediaItem } from '../types';

interface MediaItemProps {
    item: MediaItem;
    mediaType: 'movie' | 'tv' | 'anime';
}

const MediaItemComponent: React.FC<MediaItemProps> = ({ item, mediaType }) => {
    const [showModal, setShowModal] = useState(false);

    const handleItemClick = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

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
            <Modal show={showModal} onClose={handleCloseModal} item={item} />
        </>
    );
};

export default MediaItemComponent;
