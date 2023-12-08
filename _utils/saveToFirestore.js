import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from './firebase';

const saveBookToFirestore = async (book, status, add = true) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error('User not authenticated.');
    return;
  }

  const userId = user.uid;

  const userDocRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const savedBooks = userDoc.data().savedBooks || [];

    if (add) {
      savedBooks.push({ ...book, status });
    } else {
      const indexToRemove = savedBooks.findIndex((savedBook) => savedBook.key === book.key);
      if (indexToRemove !== -1) {
        savedBooks.splice(indexToRemove, 1);
      }
    }

    await setDoc(userDocRef, { savedBooks }, { merge: true });
  } else {
    console.error('User Document not found.');
  }
};

export default saveBookToFirestore;
