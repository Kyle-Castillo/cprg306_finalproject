// Page.js
"use client";
import Link from "next/link";
import "../styles/globals.css";

const Page = () => {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1rem', backgroundColor: "brown" }}>
        <h2 className=" font-black">Bookworm</h2>
      </header>
      <div className="centered-container">
        <h1 className=" font-bold text-3xl pt-5">Welcome to Bookworm!</h1>
        <h3 className=" text-2xl p-4">Your own personal online bookshelf. Save all your favorite books in one place, and keep track of all your reading habits.</h3>
        <Link href="/login">
          <button className=" bg-blue-500 p-4 rounded-xl text-xl ">Get Started</button>
        </Link>
      </div>
    </main>
  );
};

export default Page;
