import { doc, setDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
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
        // Use arrayUnion to add the book if it doesn't exist in the array
        await setDoc(userDocRef, { savedBooks: arrayUnion({ ...book, status }) }, { merge: true });
      } else {
        // Use arrayRemove to remove the book from the array
        await setDoc(userDocRef, { savedBooks: arrayRemove({ ...book, status }) }, { merge: true });
      }

      console.log('User Document updated successfully.');
    } else {
      throw new Error('User Document not found.');
    }
  } catch (error) {
    console.error('Error saving/removing book:', error.message);
  }
};

export default saveBookToFirestore;
