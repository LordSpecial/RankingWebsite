import React from 'react';
import Navbar from '../../components/common/Navbar';
import MediaList from '../../components/MediaList.tsx';

const Browse: React.FC = () => {
    return (
        <div className="container">
            <Navbar />
            <MediaList />
        </div>
    );
};

export default Browse;
