// pages/login.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "./_utils/auth-context";

const LoginPage = () => {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth() || {};
  const [githubUserName, setGithubUserName] = useState('');
  const router = useRouter()
 
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (githubUserName.trim() !== '') {
      await gitHubSignIn(githubUserName);
      router.push('/home');
    } else {
      console.error('GitHub username is empty.');
    }
  };

  const handleSignOut = () => {
    firebaseSignOut();
  }

  return (
    <main>
      <div>
        {user ? (
          <>
            <p>User: {user.displayName}</p>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <form onSubmit={handleSignIn}>
            <label>
              GitHub Username:
              <input
                type="text"
                value={githubUserName}
                onChange={(e) => setGithubUserName(e.target.value)}
              />
            </label>
            <button type="submit">
              Sign In with GitHub
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default LoginPage;
