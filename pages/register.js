import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/_utils/firebase';
import { useRouter } from 'next/router';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      // Clear previous error and success messages
      setError('');
      setSuccessMessage('');

      // Validate email
      if (!email) {
        setError('Please enter your email.');
        return;
      }

      // Validate password
      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }

      // Validate password confirmation
      if (password !== passwordConfirmation) {
        setError('Passwords do not match.');
        return;
      }

      // Register the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user details in Firestore
      const userDocRef = await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: user.email,
        // Add more details as needed
      });

      console.log('User registered successfully!');
      console.log('User details stored in Firestore:', userDocRef.id);

      // Set success message and navigate to login page
      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 3000); // Redirect to login after 3 seconds
    } catch (error) {
      console.error('Error registering user:', error.message);
      setError('Error registering user: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Confirm Password:</label>
      <input
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Register;
