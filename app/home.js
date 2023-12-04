import React, { useState} from 'react'
import fetchBooks from './api/openLibrary'

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null);
    if (query.trim() !== '') {
      try {
      const data = await fetchBooks(query);
      setResults(data?.docs || []);
      if (!data || data.docs.length ===0 ) {
        setError('No books found!');
      }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.')
      }
    }
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <p style={{color : 'red'}}>{error}</p>}
        {results && results.length > 0 ? (
          <ul>
            {results.map((book) => (
              <li key={book.key}>{book.title}</li>
            ))}
          </ul>
        ) : (
          !error && <p>No Books found.</p>
        )}
      </div>
    </main>
  )
}
