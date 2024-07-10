import { db } from '../firebaseConfig';
import { collection, getDocs, getDoc, addDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { MediaItem } from '../types';

const fetchSeenFilms = async (): Promise<MediaItem[]> => {
    const seenFilmsCollection = collection(db, 'seenFilms');
    const seenFilmsSnapshot = await getDocs(seenFilmsCollection);
    return seenFilmsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            filmId: data.filmId,
            title: data.filmTitle,
            elo: data.elo,
            manualRating: data.manualRating,
            posterUrl: data.posterUrl,
        } as MediaItem;
    });
};
const fetchUnseenFilms = async (): Promise<MediaItem[]> => {
    const unseenFilmsCollection = collection(db, 'unseenFilms');
    const unseenFilmsSnapshot = await getDocs(unseenFilmsCollection);
    return unseenFilmsSnapshot.docs.map(doc => doc.data() as MediaItem);
};

const checkFilmExists = async (filmId: number): Promise<boolean> => {
    const filmDoc = await getDoc(doc(db, 'films', filmId.toString()));
    return filmDoc.exists();
};

const addSeenFilm = async (filmId: number, filmTitle: string, manualRating: number, eloScore: number, eloComparisonCount: number, posterUrl: string) => {
    try {
        await addDoc(collection(db, 'seenFilms'), {
            filmId,
            filmTitle,
            manualRating,
            eloScore,
            eloComparisonCount,
            posterUrl,
            timestamp: new Date(),
        });
    } catch (error) {
        console.error('Error saving seen film:', error);
    }
};

const addUnseenFilm = async (filmId: number, filmTitle: string, eloScore: number, eloComparisonCount: number, posterUrl: string) => {
    try {
        await addDoc(collection(db, 'unseenFilms'), {
            filmId,
            filmTitle,
            eloScore,
            eloComparisonCount,
            posterUrl,
            timestamp: new Date(),
        });
    } catch (error) {
        console.error('Error saving unseen film:', error);
    }
};

const updateEloScore = async (filmId: number, filmTitle: string, result: 'win' | 'lose', manualRating: number) => {
    const filmRef = doc(db, 'films', filmId.toString());
    const filmDoc = await getDoc(filmRef);

    if (filmDoc.exists()) {
        const filmData = filmDoc.data();
        const currentElo = filmData.elo || 1000;
        const matches = filmData.matches || 0;
        const totalRatings = filmData.totalRatings || 0;
        const ratingSum = filmData.ratingSum || 0;
        const eloComparisons = filmData.eloComparisons || 0;

        const newElo = calculateNewElo(currentElo, result);
        await updateDoc(filmRef, {
            elo: newElo,
            matches: matches + 1,
            totalRatings: totalRatings + 1,
            ratingSum: ratingSum + manualRating,
            eloComparisons: eloComparisons + 1,
        });
    } else {
        const initialElo = 1000;
        const newElo = calculateNewElo(initialElo, result);
        await setDoc(filmRef, {
            title: filmTitle,
            elo: newElo,
            matches: 1,
            totalRatings: 1,
            ratingSum: manualRating,
            eloComparisons: 1,
        });
    }
};

const calculateNewElo = (currentElo: number, result: 'win' | 'lose'): number => {
    const kFactor = 32;
    const expectedScore = 1 / (1 + Math.pow(10, (1000 - currentElo) / 400));
    const actualScore = result === 'win' ? 1 : 0;
    return currentElo + kFactor * (actualScore - expectedScore);
};

export { fetchSeenFilms, fetchUnseenFilms, checkFilmExists, addSeenFilm, addUnseenFilm, updateEloScore };
