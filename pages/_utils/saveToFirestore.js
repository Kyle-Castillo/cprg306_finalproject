import { doc, set, remove, getDoc } from 'firebase/firestore';
import { db } from './firebase';


const saveBookToFirestore = async (book, status, add = true) => {
    const userId = '';

    if (!userId) {
        console.error('User ID not available.');
        return;
    }

    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const savedBooks = userDoc.data().savedBooks || [];

        if (add) {
            savedBooks.push({ ...book, status});
        } else {
            const indexToRemove = savedBooks.findIndex((savedBook) => savedBook.key === book.key);
            if (indexToRemove !== 1) {
                savedBooks.splice(indexToRemove, 1);
            }
        }

        await set(userDocRef, { savedBooks }, { merge: true});
    } else {
        console.error('User Document not found.');
    }
};

export default saveBookToFirestore;
