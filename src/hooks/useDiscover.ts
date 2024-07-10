import { useState, useEffect } from 'react';
import { MediaItem } from '../types';
import { fetchRandomFilm } from '../services/mediaService';
import { addUserInteraction, updateEloScore } from '../services/firebaseService';
import { auth } from '../firebaseConfig';

const useDiscover = () => {
    const [film, setFilm] = useState<MediaItem | null>(null);
    const [manualRating, setManualRating] = useState<number>(0); // New state for user rating

    const loadNewFilm = async () => {
        try {
            const newFilm = await fetchRandomFilm();
            setFilm(newFilm);
            setManualRating(0); // Reset rating
        } catch (error) {
            console.error('Error fetching film:', error);
        }
    };

    const handleSeen = async () => {
        if (film) {
            try {
                const currentElo = 1000; // Assuming initial Elo score is 1000
                const eloComparisonCount = 0; // Initial Elo comparison count
                await addUserInteraction(film.id, film.title, true, manualRating, currentElo, eloComparisonCount);
                await updateEloScore(film.id, film.title, 'win', manualRating);
            } catch (error) {
                console.error('Error handling seen interaction:', error);
            }
        }
        loadNewFilm();
    };

    const handleNotSeen = async () => {
        if (film) {
            try {
                const currentElo = 1000; // Assuming initial Elo score is 1000
                const eloComparisonCount = 0; // Initial Elo comparison count
                await addUserInteraction(film.id, film.title, false, manualRating, currentElo, eloComparisonCount);
                await updateEloScore(film.id, film.title, 'lose', manualRating);
            } catch (error) {
                console.error('Error handling not seen interaction:', error);
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

    return {
        film,
        manualRating,
        setManualRating,
        handleSeen,
        handleNotSeen,
    };
};

export default useDiscover;
