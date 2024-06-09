import React, { createContext, useState, useEffect, useCallback } from 'react';

import api from '../services/api';

const initialAuthContext = {
  token: localStorage.getItem('token') || null,
  user: null,
  isLoading: false,
  signin: async (username, password) => {},
  signup: async (username, password) => {},
  signout: () => {},
};

const AuthContext = createContext(initialAuthContext);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(initialAuthContext.token);
  const [user, setUser] = useState(initialAuthContext.user);
  const [isLoading, setIsLoading] = useState(initialAuthContext.isLoading);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      try {
        if (token) {
          const response = await api.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        }
      } catch (error) {
        handleAuthError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const handleAuthError = (error) => {
    console.error('Authentication error:', error);
    signout();
  };

  const signin = useCallback(async (username, password) => {
    try {
      const response = await api.post('/api/auth/signin', { username, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      handleAuthError(error);
    }
  }, []);

  const signup = useCallback(async (username, password) => {
    try {
      const response = await api.post('/api/auth/signup', { username, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      handleAuthError(error);
    }
  }, []);

  const signout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user, isLoading, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
