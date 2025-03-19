import { useContext } from "react";


export const useAuth = () => {
  const context = useContext(Auth);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
