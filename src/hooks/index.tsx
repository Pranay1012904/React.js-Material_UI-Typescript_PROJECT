import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { UserLogin } from "../api/index";
export const useAuth = () => {
  return useContext(AuthContext);
};
export const useProviderAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const login = async (email: string, password: string) => {
    console.log("000000:" + email);
    const response = await UserLogin(email, password);
    if (response.success) {
      console.log("hook---", response);
      setUser(response.data.user);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  const logout = () => {
    setUser(null);
  };
  return {
    user,
    loading,
    login,
    logout,
  };
};
