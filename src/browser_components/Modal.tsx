import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import CastGrid from './CastGrid.tsx';
import '../Modal.css';
import { MediaItem } from '../types.ts';

// Define the props for the Modal component
interface ModalProps {
    show: boolean; // Boolean to indicate if the modal is visible
    onClose: () => void; // Function to handle closing the modal
    item: MediaItem; // Media item to be displayed in the modal
    darkMode: boolean; // Boolean to indicate if dark mode is enabled
}

// Functional component to display a modal with media item details
const Modal: React.FC<ModalProps> = ({ show, onClose, item, darkMode }) => {
    if (!show) return null; // Return null if show is false

    const releaseYear = item.release_date
        ? new Date(item.release_date).getFullYear()
        : item.first_air_date
            ? new Date(item.first_air_date).getFullYear()
            : 'N/A'; // Calculate release year

    return (
        <div className={`modal-overlay ${darkMode ? 'dark-mode' : ''}`}>
            <div className="modal-container">
                <div className="modal-background" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${item.backdrop_path})` }}></div>
                <button className="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className="modal-body">
                    <div className="modal-image-container">
                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} className="modal-image" />
                    </div>
                    <div className="modal-details-container">
                        <div className="modal-details">
                            <h2>{item.title || item.name} ({releaseYear})</h2>
                            <p><strong>Rating:</strong> {item.vote_average} / 10</p>
                            <p><strong>Runtime:</strong> {item.runtime ? `${item.runtime} minutes` : 'N/A'}</p>
                            <p><strong>Genre:</strong> {item.genres.map(genre => genre.name).join(', ')}</p>
                            <p><strong>Director:</strong> {item.director || 'N/A'}</p>
                            <p className="overview"><strong>Overview:</strong> {item.overview}</p>
                            <div className="tags">
                                {item.tags && item.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                            </div>
                            <CastGrid cast={item.cast || []} />
                            {/* Render cast grid if cast is available*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal; // Export the Modal component
