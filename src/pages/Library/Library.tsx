import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import { fetchSeenFilms, fetchUnseenFilms } from '../../services/firebaseService';
import { FilmData } from '../../types';
import './Library.css';

const Library: React.FC = () => {
    const [films, setFilms] = useState<FilmData[]>([]);
    const [filter, setFilter] = useState<'all' | 'seen' | 'unseen'>('seen'); // Set default to 'seen'

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (filter === 'seen') {
                    const seenFilms = await fetchSeenFilms();
                    setFilms(seenFilms);
                } else if (filter === 'unseen') {
                    const unseenFilms = await fetchUnseenFilms();
                    setFilms(unseenFilms);
                } else {
                    const seenFilms = await fetchSeenFilms();
                    const unseenFilms = await fetchUnseenFilms();
                    setFilms([...seenFilms, ...unseenFilms]);
                }
            } catch (error) {
                console.error('Error fetching films:', error);
            }
        };

        fetchData();
    }, [filter]);

    return (
        <div className="page-container">
            <Navbar />
            <div className="library-content">
                <div className="filter-buttons">
                    <button
                        className={`btn btn-primary ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`btn btn-primary ${filter === 'seen' ? 'active' : ''}`}
                        onClick={() => setFilter('seen')}
                    >
                        Seen
                    </button>
                    <button
                        className={`btn btn-primary ${filter === 'unseen' ? 'active' : ''}`}
                        onClick={() => setFilter('unseen')}
                    >
                        Unseen
                    </button>
                </div>
                <div className="film-grid">
                    {films.map(film => (
                        <div key={film.key} className="film-card">
                            <img src={`https://image.tmdb.org/t/p/w500${film.posterUrl}`} alt={film.title || film.name} />
                            <h5>{film.title || film.name}</h5>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Library;
