import { useState, useEffect } from 'react';
import { MediaItem } from '../types';
import { fetchRandomFilm } from '../services/mediaService';
import { checkFilmExists, addSeenFilm, addUnseenFilm, updateEloScore } from '../services/firebaseService';
import { auth } from '../firebaseConfig';

const useDiscover = () => {
    const [film, setFilm] = useState<MediaItem | null>(null);
    const [manualRating, setManualRating] = useState<number>(0);

    const loadNewFilm = async () => {
        try {
            console.log('Fetching a new film...');
            let newFilm: MediaItem;
            let exists: boolean;
            do {
                newFilm = await fetchRandomFilm();
                console.log(`Fetched film: ${newFilm.title || newFilm.name} (ID: ${newFilm.id})`);
                exists = await checkFilmExists(newFilm.id);
                if (exists) {
                    console.log(`Film ID ${newFilm.id} already exists in the database. Fetching another film...`);
                }
            } while (exists);
            console.log(`Selected film: ${newFilm.title || newFilm.name} (ID: ${newFilm.id})`);
            setFilm(newFilm);
            setManualRating(0); // Reset rating
        } catch (error) {
            console.error('Error fetching film:', error);
        }
    };

    const handleSeen = async () => {
        if (film) {
            try {
                console.log(`Marking film as seen: ${film.title || film.name} (ID: ${film.id})`);
                const currentElo = 1000; // Assuming initial Elo score is 1000
                const eloComparisonCount = 0; // Initial Elo comparison count
                await addSeenFilm(film.id, film.title || film.name || 'Unknown', manualRating, currentElo, eloComparisonCount, film.poster_path);
                await updateEloScore(film.id, film.title || film.name || 'Unknown', 'win', manualRating);
            } catch (error) {
                console.error('Error handling seen interaction:', error);
            }
        }
        loadNewFilm();
    };

    const handleNotSeen = async () => {
        if (film) {
            try {
                console.log(`Marking film as not seen: ${film.title || film.name} (ID: ${film.id})`);
                const currentElo = 1000; // Assuming initial Elo score is 1000
                const eloComparisonCount = 0; // Initial Elo comparison count
                await addUnseenFilm(film.id, film.title || film.name || 'Unknown', currentElo, eloComparisonCount, film.poster_path);
                await updateEloScore(film.id, film.title || film.name || 'Unknown', 'lose', 0); // Pass 0 as rating since the film is not seen
            } catch (error) {
                console.error('Error handling not seen interaction:', error);
            }
        }
        loadNewFilm();
    };

    useEffect(() => {
        console.log('Initializing Discover page...');
        auth.onAuthStateChanged((user: any) => {
            if (user) {
                console.log('User is signed in. Loading new film...');
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
