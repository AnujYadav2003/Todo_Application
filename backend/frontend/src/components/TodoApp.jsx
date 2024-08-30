import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import AddTodo from './AddTodo';

const TodoApp = ({ userEmail }) => {
  const [credentials, setCredentials] = useState(userEmail ? { email: userEmail } : null);
  const [showSignup, setShowSignup] = useState(false);

  const handleSignupSuccess = (email) => {
    setCredentials({ email });
    setShowSignup(false);
  };

  const handleLoginSuccess = (email) => {
    setCredentials({ email });
  };

  if (!credentials) {
    return (
      <div>
        {showSignup ? (
          <Signup onSignupSuccess={handleSignupSuccess} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
        <button onClick={() => setShowSignup(!showSignup)}>
          {showSignup ? 'Already have an account? Login' : 'Don\'t have an account? Signup'}
        </button>
      </div>
    );
  }

  return <AddTodo userEmail={credentials.email} />;
};

export default TodoApp;
