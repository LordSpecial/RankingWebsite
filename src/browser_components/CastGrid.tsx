import React from 'react';
import { CastMember } from '../types.ts';
import '../CastGrid.css';

// Define the props for the CastGrid component
interface CastGridProps {
    cast: CastMember[]; // Array of cast members
}

// URL to a blank avatar icon or a placeholder image
const defaultImageUrl = 'https://via.placeholder.com/92';

// Functional component to display a grid of cast members
const CastGrid: React.FC<CastGridProps> = ({ cast }) => (
    <div className="cast-grid-container">
        <div className="cast-grid">
            {cast.map((member, index) => (
                <div key={index} className="cast-member">
                    <img
                        src={member.profile_path ? `https://image.tmdb.org/t/p/w92${member.profile_path}` : defaultImageUrl}
                        alt={member.name}
                        className="cast-headshot"
                    />
                    <div className="cast-name">{member.name}</div>
                    <div className="cast-character">{member.character}</div>
                </div>
            ))}
        </div>
    </div>
);

export default CastGrid; // Export the CastGrid component
