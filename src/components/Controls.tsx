import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/Controls.css';

// Define the props for the Controls component
interface ControlsProps {
    mediaType: 'movie' | 'tv' | 'anime'; // Type of media
    itemsPerPage: number; // Number of items per page
    itemsPerRow: number; // Number of items per row
    darkMode: boolean; // Boolean to indicate if dark mode is enabled
    onMediaTypeChange: (newType: 'movie' | 'tv' | 'anime') => void; // Function to handle media type change
    onItemsPerPageChange: (value: number) => void; // Function to handle items per page change
    onItemsPerRowChange: (value: number) => void; // Function to handle items per row change
    onDarkModeChange: () => void; // Function to handle dark mode change
}

// Functional component to display controls for media type, items per page, items per row, and dark mode
const Controls: React.FC<ControlsProps> = ({
                                               mediaType,
                                               itemsPerPage,
                                               itemsPerRow,
                                               darkMode,
                                               onMediaTypeChange,
                                               onItemsPerPageChange,
                                               onItemsPerRowChange,
                                               onDarkModeChange,
                                           }) => (
    <div className="row justify-content-between align-items-center mb-4">
        <div className="col-auto">
            <div className="btn-group" role="group">
                {['movie', 'tv', 'anime'].map((type) => (
                    <React.Fragment key={type}>
                        <input
                            type="radio"
                            className="btn-check"
                            name="mediaType"
                            id={type}
                            checked={mediaType === type}
                            onChange={() => onMediaTypeChange(type as 'movie' | 'tv' | 'anime')}
                        />
                        <label className="btn btn-outline-primary" htmlFor={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </label>
                    </React.Fragment>
                ))}
            </div>
        </div>
        <div className="col-auto">
            <label className="me-2">
                Items per page:
                <select className="form-select" value={itemsPerPage} onChange={e => onItemsPerPageChange(Number(e.target.value))}>
                    {[10, 25, 50, 100].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </label>
            <label className="me-2">
                Items per row:
                <select className="form-select" value={itemsPerRow} onChange={e => onItemsPerRowChange(Number(e.target.value))}>
                    {[2, 4, 6, 8, 10].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </label>
            <label>
                <div className="toggle-switch">
                    <input type="checkbox" checked={darkMode} onChange={onDarkModeChange} />
                    <span className="slider round">
                        <span className="icon sun-icon"><FontAwesomeIcon icon={faSun} /></span>
                        <span className="icon moon-icon"><FontAwesomeIcon icon={faMoon} /></span>
                    </span>
                </div>
            </label>
        </div>
    </div>
);

export default Controls; // Export the Controls component
