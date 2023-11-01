import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../../config/firebase';

export const UserContext = createContext({
  user: null,
  signOut: () => {}
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [preferences] = useState(null);
  const [loading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(
      (currentUser) => {
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