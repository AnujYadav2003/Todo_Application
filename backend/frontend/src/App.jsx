// // // // import React, { useState, createContext } from 'react';
// // // // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // // // import Signup from './components/Signup';
// // // // import Login from './components/Login';
// // // // import AddTodo from './components/AddTodo';
// // // // import Home from './components/Home';
// // // // import TodoApp from './components/TodoApp';

// // // // export const CredentialContext = createContext();

// // // // const App = () => {
// // // //   const credentialState = useState(null);

// // // //   return (
// // // //     <CredentialContext.Provider value={credentialState}>
// // // //       <BrowserRouter>
// // // //         <Routes>
// // // //           <Route path="/" element={<Home />} />
// // // //           <Route path="/signup" element={<Signup />} />
// // // //           <Route path="/login" element={<Login />} />
// // // //           <Route path="/add" element={<AddTodo />} />
// // // //           <Route path="/todoapp" element={<TodoApp />} />
// // // //         </Routes>
// // // //       </BrowserRouter>
// // // //     </CredentialContext.Provider>
// // // //   );
// // // // };

// // // // export default App;
// // // import React, { useState } from 'react';
// // // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // // import Signup from './components/Signup';
// // // import Login from './components/Login';
// // // import AddTodo from './components/AddTodo';
// // // import Home from './components/Home';
// // // import TodoApp from './components/TodoApp';

// // // const App = () => {
// // //   const [credentials, setCredentials] = useState(null);

// // //   const handleSignupSuccess = (email) => {
// // //     setCredentials({ email });
// // //   };

// // //   const handleLoginSuccess = (email) => {
// // //     setCredentials({ email });
// // //   };

// // //   return (
// // //     <BrowserRouter>
// // //       <Routes>
// // //         <Route path="/" element={<Home />} />
// // //         <Route
// // //           path="/signup"
// // //           element={<Signup onSignupSuccess={handleSignupSuccess} />}
// // //         />
// // //         <Route
// // //           path="/login"
// // //           element={<Login onLoginSuccess={handleLoginSuccess} />}
// // //         />
// // //         <Route
// // //           path="/add"
// // //           element={credentials ? <AddTodo userEmail={credentials.email} /> : <Login onLoginSuccess={handleLoginSuccess} />}
// // //         />
// // //         <Route
// // //           path="/todoapp"
// // //           element={credentials ? <TodoApp userEmail={credentials.email} /> : <Login onLoginSuccess={handleLoginSuccess} />}
// // //         />
// // //       </Routes>
// // //     </BrowserRouter>
// // //   );
// // // };

// // // export default App;

// // import React, { useState } from 'react';
// // import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
// // import Signup from './components/Signup';
// // import Login from './components/Login';
// // import AddTodo from './components/AddTodo';
// // import Home from './components/Home';
// // import TodoApp from './components/TodoApp';

// // const App = () => {
// //   const [credentials, setCredentials] = useState(null);

// //   const handleSignupSuccess = (email) => {
// //     setCredentials({ email });
// //     navigate('/login');
// //   };

// //   const handleLoginSuccess = (email) => {
// //     setCredentials({ email });
// //     navigate('/todoapp');
// //   };

// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route
// //           path="/signup"
// //           element={<Signup onSignupSuccess={handleSignupSuccess} />}
// //         />
// //         <Route
// //           path="/login"
// //           element={<Login onLoginSuccess={handleLoginSuccess} />}
// //         />
// //         <Route
// //           path="/add"
// //           element={credentials ? <AddTodo userEmail={credentials.email} /> : <Login onLoginSuccess={handleLoginSuccess} />}
// //         />
// //         <Route
// //           path="/todoapp"
// //           element={credentials ? <TodoApp userEmail={credentials.email} /> : <Login onLoginSuccess={handleLoginSuccess} />}
// //         />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // };

// // export default App;


import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import AddTodo from './components/AddTodo';
import Home from './components/Home';
import TodoApp from './components/TodoApp';

// Create a context to hold the user's credentials
export const CredentialContext = createContext();

const App = () => {
  // Define a state variable for credentials using useState
  const credentialState = useState(null);

  // Define a function to handle successful signup
  // It sets the credential state with the provided email
  const handleSignupSuccess = (email) => {
    credentialState[1]({ email });
  };

  // Define a function to handle successful login
  // It sets the credential state with the provided email
  const handleLoginSuccess = (email) => {
    credentialState[1]({ email });
  };

  return (
    // Provide the credential state to the entire application using Context Provider
    <CredentialContext.Provider value={credentialState}>
      <BrowserRouter>
        <Routes>
          {/* Define the route for the Home component */}
          <Route path="/" element={<Home />} />

          {/* Define the route for the Signup component, 
              passing handleSignupSuccess as a prop */}
          <Route
            path="/signup"
            element={<Signup onSignupSuccess={handleSignupSuccess} />}
          />

          {/* Define the route for the Login component, 
              passing handleLoginSuccess as a prop */}
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />

          {/* Define the route for the AddTodo component.
              If the user is logged in (credentialState[0] is not null),
              render the AddTodo component with the user's email as a prop.
              Otherwise, render the Login component. */}
          <Route
            path="/add"
            element={credentialState[0] ? <AddTodo userEmail={credentialState[0].email} /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />

          {/* Define the route for the TodoApp component.
              If the user is logged in (credentialState[0] is not null),
              render the TodoApp component with the user's email as a prop.
              Otherwise, render the Login component. */}
          <Route
            path="/todoapp"
            element={credentialState[0] ? <TodoApp userEmail={credentialState[0].email} /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
      </BrowserRouter>
    </CredentialContext.Provider>
  );
};

export default App;