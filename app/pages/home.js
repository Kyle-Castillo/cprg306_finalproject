"use client";

import React, { useState} from 'react'
import { useRouter } from 'next/router'; 
import fetchBooks from '../api/openLibrary'
import saveBookToFirestore from '../_utils/saveToFirestore';
import { useRouter } from 'next/router';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Plan to read');
  const router = useRouter();

  const handleSearch = async () => {
    setError(null);
    setResults(null);
    if (query.trim() !== '') {
      try {
      setLoading(true);
      const data = await fetchBooks(query);
      setResults(data?.docs || []);
      if (!data || data.docs.length ===0 ) {
        setError('No books found!');
      }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.')
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveBook = (book) => {
    saveBookToFirestore(book, selectedStatus);
  }

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
                  <button onClick={() => handleSaveBook(book)}>Save</button>
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
