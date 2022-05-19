import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { UserLogin } from "../api/index";
import {
  setItemInLocalStorage,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from "../util/localStorageHandler";
import { LOCALSTORAGE_TOKEN_KEY } from "../util";
import jwt from "jwt-decode";
export const useAuth = () => {
  return useContext(AuthContext);
};
export const useProviderAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if (userToken) {
      const userDec: any = jwt(userToken);
      console.log("hehreme:", userDec);
      setUser(userDec);
      console.log("updateUser:", user);
      setLoading(false);
    }
  }, []);
  const login = async (email: string, password: string) => {
    console.log("000000:" + email);
    const response = await UserLogin(email, password);
    if (response.success) {
      console.log("hook---", response);
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
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
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    setUser(null);
  };
  return {
    user,
    loading,
    login,
    logout,
  };
};
