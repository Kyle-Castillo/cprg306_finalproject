"use client";

import { useState } from 'react' 
import fetchBooks from './api/openLibrary';
import saveBookToFirestore from '@/_utils/saveToFirestore';
import importBooksToFirestore from '@/_utils/importBooksToFirestore';
import { onAuthStateChanged, auth } from '@/_utils/firebase';
import { useEffect } from 'react';



export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Plan to read');
  const [savedBooks, setSavedBooks] = useState([]);

  // useEffect for handling authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User ID:', user.uid);
      } else {
        console.log('User signed out');
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);


  const handleSearch = async () => {
    setError(null);
    setResults(null);

    if (query.trim() !== '') {
      try {
      setLoading(true);
      const data = await fetchBooks(query);
      console.log('API Response:', data);
      setResults(data?.docs || []);

      if (!data || data.docs.length ===0 ) {
        setError('No books found!');
      } else {
        // Call the function to import books to Firestore
        importBooksToFirestore(data.docs);
      }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.')
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchUpdatedBooks = async () => {
    try {
      const data = await fetchBooks(query);
      setResults(data?.docs || []);

      if (!data || data.docs.length === 0) {
        setError('No books found!');
      } else {
        // Update saved books state
        setSavedBooks(data.docs);
      }
    } catch (error) {
      console.error('Error fetching updated books:', error);
      setError('An error occurred while fetching updated books.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBook = async (book) => {
    try {
      setLoading(true);

      if (bookSaved(book)) {
        // If book was already saved, remove from firestore
        await saveBookToFirestore(book, selectedStatus, false);
      } else {
        // If book is not saved, add to firestore
        await saveBookToFirestore(book, selectedStatus);
      }

      // Fetch updated books and update the saved books state
      await fetchUpdatedBooks();
    } catch (error) {
      console.error('Error saving/removing book:', error);
      setError('An error occurred while saving/removing the book.');
    } finally {
      setLoading(false);
    }
  };

  // Check if the book is already saved to firestore
  const bookSaved = (book) => {
    return savedBooks.some((savedBook) => savedBook.key === book.key);
  };

  return (
    <main>
      <div className='top-bar'>
        <div className='logo-text'>
          <h1 className='logo-text'>Bookworm</h1>
        </div>
        <div className='top-menu'>
          <button className='quick-menu-button'>Home</button>
          <button className='quick-menu-button'>Books</button>
          <button className='quick-menu-button'>Search</button>
        </div>
      </div>
      <div className='main-body'>
        <h1>Welcome to Bookworm!</h1>
        <h2>Search for a book:</h2>
        <div>
          <input
            type='text'
            id='book-search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching for books...' : 'Search'}
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{color : 'red'}}>{error}</p>}
        {results && results.length > 0 ? (
          <ul>
            {results.map((book) => (
              <li key={book.key}>{book.title}
                <div>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="Plan to read">Add to reading list</option>
                    <option value="Favorite books">Add to Favorites</option>
                    <option value="Already Read">Add to finished</option>
                    <option value="Currently Reading">Currently Reading</option>
                  </select>
                  <button onClick={() => handleSaveBook(book)}>{loading ? 'Processing...' : (bookSaved(book) ? 'Remove' : 'Save')}</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !loading && !error && <p>No Books found.</p>
        )}
      </div>
    </main>
  )
}
