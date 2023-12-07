"use client";

import { useRouter } from "next/navigation";


export default function Home() {
    const router = useRouter();
  return (
    <main>
      <div className='top-bar'>
        <div className='logo-text'>
          <h1 className='logo-text'>Bookworm</h1>
        </div>
        <div className='top-menu'>
          <button className='quick-menu-button'>Home</button>
          <button className='quick-menu-button'>Books</button>
        </div>
      </div>
      <div className='main-body'>
        <div className='user-profile'>
            <p className='user-name'>Name: </p>
            <p className='user-books-read'>Books read: </p>
            <p className='user-books-list'>Books in reading list: </p>
            <p className='user-books-current'>Currently reading: </p>
        </div>
        <div className='user-data'>
          <div className='books-read-list'>
            <h1 className='books-read'>Youve finished reading:</h1>
          </div>
          <div className='books-reading-list'>
            <h1 className='future-books'>You plan to read:</h1>
          </div>
          <div className=''>

          </div>

        </div>
      </div>
    </main>
  )
}
