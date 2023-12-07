"use client";
import Link from "next/link";

const Page = () => {
    return(
        <main>
            <h1>Bookworm</h1>
            <h3>Personal Book library</h3>
            <Link href="/login">
        <button>Login</button>
      </Link>

        </main>
    );
};

export default Page;