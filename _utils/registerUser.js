// registerUser.js
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const registerUser = async (email, password) => {
  try {
    // Register the user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create a document in the 'users' collection with the user's UID
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      email: user.email,
      // Add other user-specific data as needed
    });

    console.log('User registered successfully!');
  } catch (error) {
    console.error('Error registering user:', error.message);
  }
};

export default registerUser;
