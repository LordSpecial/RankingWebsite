import React from 'react';
import Navbar from '../../components/common/Navbar';
import useDiscover from '../../hooks/useDiscover';
import './Discover.css';

const Discover: React.FC = () => {
    const { film, manualRating, setManualRating, handleSeen, handleNotSeen } = useDiscover();

    return (
        <div className="container">
            <Navbar />
            <div className="discover-content">
                {film ? (
                    <div className="film-card">
                        <h2>{film.title}</h2>
                        <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} />
                        <p>{film.overview}</p>
                        <div className="rating">
                            <label htmlFor="rating">Your Rating:</label>
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                value={manualRating}
                                onChange={(e) => setManualRating(Number(e.target.value))}
                                min="0"
                                max="10"
                                disabled={film === null}
                            />
                        </div>
                        <div className="buttons">
                            <button className="btn btn-primary" onClick={handleSeen}>Seen</button>
                            <button className="btn btn-secondary" onClick={handleNotSeen}>Not Seen</button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Discover;
