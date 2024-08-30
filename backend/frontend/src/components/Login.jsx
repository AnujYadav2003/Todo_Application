

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${window.location.origin}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError('Invalid user');
        throw new Error('Invalid user');
      }

      const data = await response.json();
      if (data.message === 'User login successfully') {
        onLoginSuccess(email);
        navigate('/todoapp'); // Redirect to todoapp page after successful login
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('There was an error logging in:', error);
    }
  };

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mx-auto mt-16">
      {error && <div className='mx-24 text-red-600'>{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <h2 className="font-small text-gray-700">Email</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <h2 className="font-small text-gray-700">Password</h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      <div className="mt-4 text-center">OR</div>
      <div className="mt-2 text-center">
        <h2 className="text-sm">Don't have an Account?</h2>
        <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
      </div>
    </div>
  );
};

export default Login;
