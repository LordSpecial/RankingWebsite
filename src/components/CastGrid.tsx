import React from 'react';
import { CastMember } from '../types';
import '../CastGrid.css';

interface CastGridProps {
    cast: CastMember[];
}

const CastGrid: React.FC<CastGridProps> = ({ cast }) => (
    <div className="cast-grid-container">
        <div className="cast-grid">
            {cast.map((member, index) => (
                <div key={index} className="cast-member">
                    {member.profile_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w92${member.profile_path}`}
                            alt={member.name}
                            className="cast-headshot"
                        />
                    )}
                    <div className="cast-name">{member.name}</div>
                    <div className="cast-character">{member.character}</div>
                </div>
            ))}
        </div>
    </div>
);

export default CastGrid;
