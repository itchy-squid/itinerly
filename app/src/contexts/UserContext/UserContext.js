import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../../config/firebase';

export const UserContext = createContext({
  user: null,
  signOut: () => {}
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(
      (currentUser) => {
        console.log('setUser():', user)
        setUser(currentUser);
        setError(null);
      },
      (error) => {
        setError(error);
      });
  }, []);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <UserContext.Provider value={{ user, preferences, loading, error, signOut }}>
        {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
}