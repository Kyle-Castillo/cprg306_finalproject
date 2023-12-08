"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { onAuthStateChanged, auth } from '@/_utils/firebase';
import firestore from "@/_utils/firebase";
import { collection, getDocs, doc, getDoc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '@/_utils/firebase';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [booksRead, setBooksRead] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [planToRead, setPlanToRead] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use onAuthStateChanged to listen for changes in user authentication state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);

          if (user) {
            // Fetch user data from Firestore
            fetchUserData(user.uid);
          }
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error('Error in onAuthStateChanged:', error.message);
      }
    };

    fetchData();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      // Fetch user document from Firestore
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setBooksRead(userData.booksRead || []);
        setFavoriteBooks(userData.favoriteBooks || []);
        setCurrentlyReading(userData.currentlyReading || []);
        setPlanToRead(userData.planToRead || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
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
