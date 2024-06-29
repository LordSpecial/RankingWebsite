import React from 'react';

interface HeaderProps {
    mediaType: 'movie' | 'tv' | 'anime';
}

const Header: React.FC<HeaderProps> = ({ mediaType }) => {
    return (
        <h2 className="mb-4">Top {mediaType === 'movie' ? 'Movies' : mediaType === 'tv' ? 'TV Shows' : 'Anime'}</h2>
    );
};

export default Header;
