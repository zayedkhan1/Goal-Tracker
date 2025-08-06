import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Enhanced initialization with data validation
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('goalTrackerUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.name) {
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        localStorage.removeItem('goalTrackerUser');
      }
    };
    
    loadUser();
  }, []);

  const login = (name) => {
    const userData = { 
      name: name.trim(), 
      loggedIn: true,
      loginTime: new Date().toISOString() // Track login time
    };
    setUser(userData);
    localStorage.setItem('goalTrackerUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('goalTrackerUser');
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <AppContext.Provider value={{ user, login, logout, showConfetti, triggerConfetti }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);