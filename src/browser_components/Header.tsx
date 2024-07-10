import React from 'react';

// Define the props for the Header component
interface HeaderProps {
    mediaType: 'movie' | 'tv' | 'anime'; // Specifies the type of media (movie, TV show, or anime)
}

// Functional component to display the header
const Header: React.FC<HeaderProps> = ({ mediaType }) => (
    <h2 className="mb-4">Top {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}s</h2> // Display the media type in the header
);

export default Header; // Export the Header component
