import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { UserLogin, EditProfile } from "../api/index";
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

  const updateUser = async (
    userId: string,
    name: string,
    password: string,
    confirm_password: string
  ) => {
    console.log("params n updateUsr", userId, name, password, confirm_password);
    const response = await EditProfile(
      userId,
      name,
      password,
      confirm_password
    );
    console.log("Edit Profile_hooks:", response);
    if (response.success) {
      console.log("after edit", response.data.token);
      if (response.data.token) {
        localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
        localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, response.data.token);
      }
      const userDec: any = jwt(
        localStorage.getItem(LOCALSTORAGE_TOKEN_KEY) || ""
      );
      setUser(userDec);
      console.log("decoded er", user);
      return {
        success: response.success,
      };
    } else {
      return {
        success: response.success,
        message: response.message,
      };
    }
  };
  return {
    user,
    loading,
    login,
    logout,
    updateUser,
  };
};
