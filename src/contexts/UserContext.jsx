import React, { createContext, useState, useEffect } from "react";

// Create the UserContext
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
  // Initialize state with localStorage check
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("classUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Sync user state with localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("classUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("classUser");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
