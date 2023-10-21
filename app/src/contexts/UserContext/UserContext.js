import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [preferences, setPreferences] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProjects() {
          try
          {
            setPreferences({currency: '$'});
          }
          catch(error) { setError(error); }
          finally { setLoading(false); }
        }

        setLoading(true);
        setError(null);
        loadProjects();
    }, []);

    return (
        <UserContext.Provider value={{ preferences, loading, error }}>
            {children}
        </UserContext.Provider>
    );
}

const useUser = () => {
  return useContext(UserContext);
}

export { UserContext, UserProvider, useUser };
