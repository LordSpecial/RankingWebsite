import React from 'react';
import Navbar from '../../components/common/Navbar';

const Home: React.FC = () => {
    return (
        <div className="container">
            <Navbar />
            <h1>Welcome to Media Ranking</h1>
            <p>Select a page to get started:</p>
        </div>
    );
};

export default Home;
