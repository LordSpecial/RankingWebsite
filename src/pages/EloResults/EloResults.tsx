import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import { fetchSeenFilms } from '../../services/firebaseService';
import { MediaItem } from '../../types';
import './EloResults.css';

const EloResults: React.FC = () => {
    const [films, setFilms] = useState<MediaItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const seenFilms = await fetchSeenFilms();
                const sortedFilms = seenFilms.sort((a, b) => b.elo - a.elo); // Sort films by ELO score
                setFilms(sortedFilms);
            } catch (error) {
                console.error('Error fetching films:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container-fluid elo-results-container">
            <Navbar />
            <div className="elo-results-content">
                <h2 className="mb-4">ELO Results</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Poster</th>
                        <th>Title</th>
                        <th>ELO Score</th>
                        <th>Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {films.map(film => (
                        <tr key={film.filmId}>
                            <td>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${film.posterUrl}`}
                                    alt={film.title}
                                    className="mini-poster"
                                />
                            </td>
                            <td>{film.title}</td>
                            <td>{film.elo}</td>
                            <td>{film.manualRating}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EloResults;
