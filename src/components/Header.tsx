import React from 'react';

interface HeaderProps {
    mediaType: 'movie' | 'tv' | 'anime';
}

const Header: React.FC<HeaderProps> = ({ mediaType }) => (
    <h2 className="mb-4">Top {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}s</h2>
);

export default Header;
