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
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1rem', backgroundColor: "brown" }}>
        <h2 className=" font-black">Bookworm</h2>
      </header>
      <div className='centered-container'>
        <h2 className=' text-2xl'>Login</h2>
        <label className=' text-x1'>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className=' text-xl'>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin} className=" bg-blue-500 p-4 rounded-xl text-xl ">Login</button>

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
