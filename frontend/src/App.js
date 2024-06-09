import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NotFound from './components/NotFound';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import TodoList from './components/Todo/TodoList';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { token } = useContext(AuthContext);

  return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route
              path="/"
              exact
              element={token ? <TodoList /> : <Signin />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
