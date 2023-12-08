import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { onAuthStateChanged, auth } from '@/_utils/firebase';
import firestore from "@/_utils/firebase";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "@/_utils/firebase";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [booksRead, setBooksRead] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [planToRead, setPlanToRead] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await onAuthStateChanged(auth);
      if (user) {
        setUser(user);

        // Fetch user data from Firestore
        fetchUserData(user.uid);
      } else {
        setUser(null);
      }
    };

    fetchData();
  }, []);

  const fetchUserData = async (userId) => {
    // Fetch user document from Firestore
    const userDocRef = firestore.collection('users').doc(userId);
    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      setBooksRead(userData.booksRead || []);
      setFavoriteBooks(userData.favoriteBooks || []);
      setCurrentlyReading(userData.currentlyReading || []);
      setPlanToRead(userData.planToRead || []);
    }
  };


  return (
    <main>
      <div className='top-bar'>
        <div className='logo-text'>
          <h1 className='logo-text'>Bookworm</h1>
        </div>
        <div className='top-menu'>
          <button className='quick-menu-button' onClick={() => router.push('/home')}>Home</button>
        </div>
      </div>
      <div className='main-body'>
        <div className='user-profile'>
          <p className='user-name'>Name: {user ? user.email : 'Not logged in'}</p>
          <p className='user-books-read'>Books read: {booksRead.length}</p>
          <p className='user-books-list'>Books in Favorites: {favoriteBooks.length}</p>
          <p className='user-books-current'>Currently reading: {currentlyReading.length}</p>
        </div>
        <div className='user-data'>
          <div className='books-read-list'>
            <h1 className='books-read'>You&apos;ve finished reading:</h1>
            <ul>
              {booksRead.map((book, index) => (
                <li key={index}>{book}</li>
              ))}
            </ul>
          </div>
          <div className='books-reading-list'>
            <h1 className='future-books'>You plan to read:</h1>
            <ul>
              {planToRead.map((book, index) => (
                <li key={index}>{book}</li>
              ))}
            </ul>
          </div>
          {/* Add other sections as needed */}
        </div>
      </div>
    </main>
  )
}
