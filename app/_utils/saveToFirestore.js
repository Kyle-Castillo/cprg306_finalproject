import { collection, addDoc } from "firebase/firestore";
import firestore from "./firebase";

const saveBookToFirestore = async (book, status) => {
    try {
        const booksCollection = collection(firestore, 'books');
        await addDoc(booksCollection,{ ...book, status});
        console.log('Book saved to Firestore:', book, 'Status:', status);
    } catch (error) {
        console.error('Error saving book', error);
    }
};

export default saveBookToFirestore;