import { db } from '../firebaseConfig';
import { collection, addDoc, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { MediaItem } from '../types';

const addUserInteraction = async (filmId: number, filmTitle: string, seen: boolean, manualRating: number, eloScore: number, eloComparisonCount: number) => {
    try {
        await addDoc(collection(db, 'userInteractions'), {
            filmId,
            filmTitle,
            seen,
            manualRating,
            eloScore,
            eloComparisonCount,
            timestamp: new Date(),
        });
    } catch (error) {
        console.error('Error saving interaction:', error);
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

export { addUserInteraction, updateEloScore };
