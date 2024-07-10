import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0AXHVpxdAHSVAo6JWOw7gsJPfsxUr25Q",
    authDomain: "mediaranking-b97a9.firebaseapp.com",
    projectId: "mediaranking-b97a9",
    storageBucket: "mediaranking-b97a9.appspot.com",
    messagingSenderId: "453642992959",
    appId: "1:453642992959:web:7d36cdb264bdd0caed678a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

signInAnonymously(auth)
    .then(() => {
        console.log('Signed in anonymously');
    })
    .catch((error) => {
        console.error('Error signing in anonymously:', error);
    });

export { db, auth };