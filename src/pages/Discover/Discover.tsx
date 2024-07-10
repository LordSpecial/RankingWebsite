import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import { MediaItem } from '../../types';
import { fetchRandomFilm } from '../../services/mediaService';
import { db, auth } from '../../firebaseConfig';
import { collection, addDoc, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import './Discover.css';

const Discover: React.FC = () => {
    const [film, setFilm] = useState<MediaItem | null>(null);

    const loadNewFilm = async () => {
        try {
            const newFilm = await fetchRandomFilm();
            setFilm(newFilm);
        } catch (error) {
            console.error('Error fetching film:', error);
        }
    };

    const updateEloScore = async (filmId: number, filmTitle: string, result: 'win' | 'lose') => {
        const filmRef = doc(db, 'films', filmId.toString());
        const filmDoc = await getDoc(filmRef);

        if (filmDoc.exists()) {
            const filmData = filmDoc.data();
            const currentElo = filmData.elo || 1000;
            const matches = filmData.matches || 0;

            const newElo = calculateNewElo(currentElo, result);
            await updateDoc(filmRef, {
                elo: newElo,
                matches: matches + 1,
            });
        } else {
            const initialElo = 1000;
            const newElo = calculateNewElo(initialElo, result);
            await setDoc(filmRef, {
                title: filmTitle,
                elo: newElo,
                matches: 1,
            });
        }
    };

    const calculateNewElo = (currentElo: number, result: 'win' | 'lose'): number => {
        const kFactor = 32;
        const expectedScore = 1 / (1 + Math.pow(10, (1000 - currentElo) / 400));
        const actualScore = result === 'win' ? 1 : 0;
        return currentElo + kFactor * (actualScore - expectedScore);
    };

    const handleSeen = async () => {
        if (film) {
            try {
                await addDoc(collection(db, 'userInteractions'), {
                    filmId: film.id,
                    filmTitle: film.title,
                    status: 'Seen',
                    timestamp: new Date(),
                });
                await updateEloScore(film.id, film.title, 'win');
            } catch (error) {
                console.error('Error saving interaction:', error);
            }
        }
        loadNewFilm();
    };

    const handleNotSeen = async () => {
        if (film) {
            try {
                await addDoc(collection(db, 'userInteractions'), {
                    filmId: film.id,
                    filmTitle: film.title,
                    status: 'Not Seen',
                    timestamp: new Date(),
                });
                await updateEloScore(film.id, film.title, 'lose');
            } catch (error) {
                console.error('Error saving interaction:', error);
            }
        }
        loadNewFilm();
    };

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                loadNewFilm();
            } else {
                console.log('User not signed in');
            }
        });
    }, []);

    return (
        <div className="container">
            <Navbar />
            <div className="discover-content">
                {film ? (
                    <div className="film-card">
                        <h2>{film.title}</h2>
                        <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} />
                        <p>{film.overview}</p>
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
