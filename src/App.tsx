import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Browse from "./pages/Browse/Browse";
import Discover from './pages/Discover/Discover';
import Rate from './pages/Rate/Rate';
import EloResults from './pages/EloResults/EloResults';
import Home from './pages/Home/Home';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/discover" element={<Discover />} />
                        <Route path="/rate" element={<Rate />} />
                        <Route path="/elo-results" element={<EloResults />} />
                        <Route path="/browse" element={<Browse />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
