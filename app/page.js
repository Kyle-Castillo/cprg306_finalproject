// pages/login.js
"use client";

import React, { useState } from "react";
import { useUserAuth } from "./_utils/auth-context";
import { useRouter } from "next/router";

const LoginPage = () => {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [githubUserName, setGithubUserName] = useState('');
  const router = useRouter();
 
  const handleSignIn = async () => {
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
          <form>
            <label>
              GitHub Username:
              <input
                type="text"
                value={githubUserName}
                onChange={(e) => setGithubUserName(e.target.value)}
              />
            </label>
            <button type="button" onClick={handleSignIn}>
              Sign In with GitHub
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default LoginPage;
