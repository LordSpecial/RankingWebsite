import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="container">
            <h1>Welcome to Media Ranking</h1>
            <p>Select a page to get started:</p>
            <ul>
                <li><Link to="/discover">Discover</Link></li>
                <li><Link to="/rate">Rate</Link></li>
                <li><Link to="/elo-results">ELO Results</Link></li>
                <li><Link to="/browse">Browse</Link></li>
            </ul>
        </div>
    );
};

export default Home;
