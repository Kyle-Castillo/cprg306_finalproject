// SaveBookToFirestore.js

import { doc, setDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from './firebase';

const saveBookToFirestore = async (book, setSavedBooks) => {
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
      const { savedBooks, favoriteBooks, currentlyReading, booksRead, planToRead } = userDoc.data();

      const updatedStatus = book.status || 'savedBooks';

      if (updatedStatus === 'savedBooks') {
        // If the status is 'savedBooks', add the book to the savedBooks array
        await setDoc(userDocRef, { savedBooks: arrayUnion(book) }, { merge: true });
      } else {
        // If the status is one of the specific categories, add the book to that category
        await setDoc(userDocRef, {
          [updatedStatus]: arrayUnion(book),
          savedBooks: arrayUnion(book),
        }, { merge: true });
      }

      // Update the state with the new savedBooks array
      setSavedBooks(savedBooks);

      console.log('User Document updated successfully.');
    } else {
      throw new Error('User Document not found.');
    }
  } catch (error) {
    console.error('Error saving book:', error.message);
  }
};

export default saveBookToFirestore;
