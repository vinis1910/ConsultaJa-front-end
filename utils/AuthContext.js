import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext(null);

const getUserInfo = () => {
    return localStorage.getItem("user") ? localStorage.getItem("user") : null;
}

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(getUserInfo());

    useEffect(() => {
        
        if (user) {
            localStorage.setItem("user", user);
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};