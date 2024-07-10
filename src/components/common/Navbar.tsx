import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import useDarkMode from '../../hooks/useDarkMode';

const Navbar: React.FC = () => {
    const [darkMode, toggleDarkMode] = useDarkMode();

    return (
        <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Media Ranking</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/discover">Discover</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/rate">Rate</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/elo-results">ELO Results</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/browse">Browse</Link>
                        </li>
                    </ul>
                    <div className="ms-auto">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="darkModeToggle" checked={darkMode} onChange={toggleDarkMode} />
                            <label className="form-check-label" htmlFor="darkModeToggle">
                                {darkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
