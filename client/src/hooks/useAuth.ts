import { useState, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { User } from '../types';
import { setToken, getToken, setUser, getUser, removeToken, removeUser } from '../utils/helpers';

export const useAuth = () => {
  const [user, setUserState] = useState<User | null>(getUser());
  const [token, setTokenState] = useState<string | null>(getToken());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback((authToken: string, userData: User) => {
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

  const updateUser = useCallback((userData: User) => {
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
    setLoading: setLoading as Dispatch<SetStateAction<boolean>>,
    setError: setError as Dispatch<SetStateAction<string | null>>,
  };
};
