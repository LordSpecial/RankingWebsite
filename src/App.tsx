import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Browse from './pages/Browse/Browse';
import Discover from './pages/Discover/Discover';
import Rate from './pages/Rate/Rate';
import EloResults from './pages/EloResults/EloResults';
import Library from './pages/Library/Library';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/discover" />} />
                        <Route path="/discover" element={<Discover />} />
                        <Route path="/rate" element={<Rate />} />
                        <Route path="/elo-results" element={<EloResults />} />
                        <Route path="/browse" element={<Browse />} />
                        <Route path="/library" element={<Library />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
