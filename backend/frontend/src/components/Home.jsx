import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialContext } from '../App';

const Home = () => {
  const [credentials] = useContext(CredentialContext);
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {credentials ? (
        <h1 className="text-3xl font-bold mb-6">Hello, {credentials.email}</h1>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Welcome, please login or signup.</h1>
          <div className="space-x-4">
            <button
              onClick={handleLoginRedirect}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={handleSignupRedirect}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Signup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
 