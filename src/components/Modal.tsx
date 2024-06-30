import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../Modal.css';
import { MediaItem } from '../types';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    item: MediaItem;
    darkMode: boolean;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, item, darkMode }) => {
    if (!show) return null;

    const releaseYear = item.release_date
        ? new Date(item.release_date).getFullYear()
        : item.first_air_date
            ? new Date(item.first_air_date).getFullYear()
            : 'N/A';

    return (
        <div className={`modal-overlay ${darkMode ? 'dark-mode' : ''}`}>
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className="modal-header">
                    <img src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`} alt={item.title || item.name} className="modal-banner" />
                </div>
                <div className="modal-body">
                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} className="modal-image" />
                    <div className="modal-details">
                        <h2>{item.title || item.name} ({releaseYear})</h2>
                        <p><strong>Rating:</strong> {item.vote_average} / 10</p>
                        <p><strong>Runtime:</strong> {item.runtime ? `${item.runtime} minutes` : 'N/A'}</p>
                        <p><strong>Genre:</strong> {item.genres.map(genre => genre.name).join(', ')}</p>
                        <p><strong>Director:</strong> {item.director || 'N/A'}</p>
                        <p><strong>Cast:</strong> {item.cast ? item.cast.map(member => `${member.name} as ${member.character}`).join(', ') : 'N/A'}</p>
                        <p><strong>Overview:</strong> {item.overview}</p>
                        <div className="tags">
                            {item.tags && item.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
