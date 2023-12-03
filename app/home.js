import React from 'react'

export default function Home() {
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
      </div>
    </main>
  )
}
