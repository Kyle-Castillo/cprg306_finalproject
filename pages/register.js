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
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1rem', backgroundColor: "brown" }}>
        <h2 className=" font-black">Bookworm</h2>
      </header>
    <div>
      <h2 className=' text-2xl'>Register</h2>
      <label className=' text-x1'>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label className=' text-x1'>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label className=' text-x1'>Confirm Password:</label>
      <input
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button onClick={handleRegister} className=" bg-blue-500 p-4 rounded-xl text-xl ">Register</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  </main>
  );
};

export default Register;
