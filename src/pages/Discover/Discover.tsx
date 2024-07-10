import React from 'react';
import Navbar from '../../components/common/Navbar';
import useDiscover from '../../hooks/useDiscover';
import './Discover.css';

const Discover: React.FC = () => {
    const {film, manualRating, setManualRating, handleSeen, handleNotSeen} = useDiscover();

    return (
        <div className="container-fluid discover-container">
            <Navbar/>
            <div className="discover-content">
                {film ? (
                    <div className="film-card">
                        <h2 className="card-title">{film.title}</h2>
                        <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                             alt={film.title}/>
                        <p className="card-text film-description">
                            {film.overview}
                        </p>
                        <div className="rating">
                            <label htmlFor="rating">Your Rating:</label>
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                className="form-control"
                                value={manualRating}
                                onChange={(e) => setManualRating(Number(e.target.value))}
                                min="0"
                                max="10"
                            />
                        </div>
                        <div className="buttons">
                            <button className="btn btn-primary me-2" onClick={handleSeen}>Seen</button>
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
