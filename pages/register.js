import { useState } from 'react';
import registerUser from '@/_utils/registerUser'; // Import the registerUser function
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

      // Validate email, password, and password confirmation here...

      // Call the registerUser function
      await registerUser(email, password);

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
