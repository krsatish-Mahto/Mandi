import { useState, useCallback } from 'react';
import { setToken, getToken, setUser, getUser, removeToken, removeUser } from '../utils/helpers';

export const useAuth = () => {
  const [user, setUserState] = useState(getUser());
  const [token, setTokenState] = useState(getToken());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback((authToken, userData) => {
    setToken(authToken);
    setUser(userData);
    setTokenState(authToken);
    setUserState(userData);
    setError(null);
  }, []);

  const logout = useCallback(() => {
    removeToken();
    removeUser();
    setTokenState(null);
    setUserState(null);
    setError(null);
  }, []);

  const updateUser = useCallback((userData) => {
    setUser(userData);
    setUserState(userData);
  }, []);

  const isAuthenticated = !!token && !!user;

  return {
    user,
    token,
    loading,
    error,
    login,
    logout,
    updateUser,
    isAuthenticated,
    setLoading,
    setError,
  };
};
