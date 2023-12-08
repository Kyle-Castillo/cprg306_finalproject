import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from './firebase';

const saveBookToFirestore = async (book, status, add = true) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('User not authenticated.');
    }

    const userId = user.uid;
    console.log('User ID:', userId);

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
      console.log('User Document updated successfully.');
    } else {
      throw new Error('User Document not found.');
    }
  } catch (error) {
    console.error('Error saving/removing book:', error.message);
  }
};

export default saveBookToFirestore;
