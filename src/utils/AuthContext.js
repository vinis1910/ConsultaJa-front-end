import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext(null);

const getAuthData = () => {
  const authData = localStorage.getItem("auth-data");
  return authData ? JSON.parse(authData) : null;
};

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(getAuthData());

  useEffect(() => {
    if (authData) {
      localStorage.setItem("auth-data", JSON.stringify(authData));
    } else {
      localStorage.removeItem("auth-data");
    }
  }, [authData]);

  const login = (authData) => {
    setAuthData(authData);
  };

  const logout = () => {
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext);
};