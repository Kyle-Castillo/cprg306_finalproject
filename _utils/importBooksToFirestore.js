import { addDoc, collection, getDocs, query, where, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const importBooksToFirestore = async (books) => {
  try {
    // Reference to the "books" collection
    const booksCollection = collection(db, 'books');

    // Check if the "books" collection exists
    const collectionQuery = query(collection(db, 'system'), where('name', '==', 'books'));
    const collectionSnapshot = await getDocs(collectionQuery);

    if (collectionSnapshot.empty) {
      // If the "books" collection doesn't exist, create it
      const systemDocRef = doc(db, 'system', 'books');
      await setDoc(systemDocRef, { name: 'books' });
    }

    // Use Promise.all with map for concurrent execution of addDoc
    await Promise.all(books.map(async (book) => {
      await addDoc(booksCollection, book);
    }));

    console.log('Books imported to Firestore successfully.');
  } catch (error) {
    console.error('Error importing books to Firestore:', error.message);
    console.error(error.stack);
  }
};

export default importBooksToFirestore;
