// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";


// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     // Check authentication on app load
//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem("user"));
//         if (storedUser) {
//             setUser(storedUser);
//         }
//     }, []);

//     // Login function
//     const login = (username, password) => {
//         if (username === "admin" && password === "password") {
//             const userData = { username };
//             localStorage.setItem("user", JSON.stringify(userData));
//             setUser(userData);
//             navigate("/create-invoice");
//         } else {
//             throw new Error("Invalid credentials");
//         }
//     };

//     // Logout function
//     const logout = () => {
//         localStorage.removeItem("user");
//         setUser(null);
//         navigate("/");
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email, password) => {
    if (email === "admin@icchaporon.com" && password === "password") {
      const userData = { email };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return true; // Return true to indicate successful login
    } else {
      return false; // Return false for invalid credentials
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
