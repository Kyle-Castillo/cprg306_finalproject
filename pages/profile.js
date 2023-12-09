"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from '@/_utils/firebase';
import firestore from "@/_utils/firebase";
import { collection, getDocs, doc, getDoc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '@/_utils/firebase';
import '../styles/globals.css';

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
        setBooksRead(userData['Already Read'] || []);
        setFavoriteBooks(userData['Favorite books'] || []);
        setCurrentlyReading(userData['Currently Reading'] || []);
        setPlanToRead(userData['Plan to read'] || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  // Helper function to get the total number of books
  const getTotalBooksCount = () => {
    return booksRead.length + favoriteBooks.length + currentlyReading.length + planToRead.length;
  };

  return (
    <main>
      <div
        className="top-bar flex items-center p-4 mb-8"
        style={{ backgroundColor: "brown" }}
      >
        <div className='logo-text'>
        <h2 className="logo-text font-black ml-1">Bookworm</h2>
        </div>
        <div className='top-menu flex space-x-4"'>
          <button className='quick-menu-button border-x border-black bg-brown h-full w-full text-lg' onClick={() => router.push('/home')}>Home</button>
        </div>
      </div>
      <div className='main-body'>
        <div className='user-profile'>
          <p className='user-name'>Name: {user ? user.email : 'Not logged in'}</p>
          <p className='user-books'>Books read: {booksRead.length}</p>
          <p className='user-books'>Books in Favorites: {favoriteBooks.length}</p>
          <p className='user-books'>Currently reading: {currentlyReading.length}</p>
          <p className='user-books'>Plan To Read: {planToRead.length}</p>
          <p className='user-total'>Total books: {getTotalBooksCount()}</p>
        </div>
        <div className='user-data'>
          <div className='books-read-list'>
            <h1 className='books-read'>You&apos;ve finished reading:</h1>
            <ul>
              {booksRead.map((book, index) => (
                <li key={index}>{book.title} by {book.author_name}</li>
              ))}
            </ul>
          </div>
          <div className='books-read-list'>
            <h1 className='books-read'>You loved Reading:</h1>
            <ul>
              {favoriteBooks.map((book, index) => (
                <li key={index}>{book.title} by {book.author_name}</li>
              ))}
            </ul>
          </div>
          <div className='books-read-list'>
            <h1 className='books-read'>You&apos;re currently reading:</h1>
            <ul>
              {currentlyReading.map((book, index) => (
                <li key={index}>{book.title} by {book.author_name}</li>
              ))}
            </ul>
          </div>
          <div className='books-reading-list'>
            <h1 className='future-books'>You plan to read:</h1>
            <ul>
              {planToRead.map((book, index) => (
                <li key={index}>{book.title} by {book.author_name}</li>
              ))}
            </ul>
          </div>
          {/* Add other sections as needed */}
        </div>
      </div>
    </main>
  );
}
