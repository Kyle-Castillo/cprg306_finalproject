// Login.js

import Link from 'next/link';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/_utils/firebase';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Clear previous errors
      setError(null);

      // Validate email and password
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }

      // Sign in the user with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      console.log('User logged in successfully!');
      const user = auth.currentUser;
      console.log('User ID:', user.uid);
      
      // Redirect to the home page after successful login
      router.push('/home');
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <main>
      <div>
        <h2>Login</h2>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>
          Don&rsquo;t have an account?{' '}
          <Link href="/register">
            <a>Register here</a>
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
