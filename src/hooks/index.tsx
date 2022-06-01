import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { UserLogin, EditProfile, fetchFriends } from "../api/index";
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
  const getFrnd = async (userDec: any) => {
    const userFriends = await fetchFriends();
    if (userFriends.success) {
      userDec.friendships = userFriends.data?.friends;
    } else {
      console.log("User Friends Unfetched!");
    }
  };
  useEffect(() => {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if (userToken) {
      const userDec: any = jwt(userToken);
      if (userDec) {
        getFrnd(userDec); // to fetch user friends :-)
      }

      setUser(userDec);

      setLoading(false);
    }
  }, []);
  const login = async (email: string, password: string) => {
    console.log("000000:" + email);
    const response = await UserLogin(email, password);

    if (response.success) {
      console.log("hook---", response);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      const userToken: any = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
      const userDec: any = jwt(userToken);
      if (userDec) {
        getFrnd(userDec); // to fetch user friends :-)
      }
      setUser(userDec);
      /* if (user) {
        const userFriends = await fetchFriends();
        if (userFriends.success) {
          //userDec.friendships = userFriends.data?.friends;
          console.log("Friends fetched on login");
        } else {
          console.log("User Friends Unfetched!");
        }
      }*/
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
  const updateUserFriends = async (addFriend: boolean, friend: any) => {
    const newUser: any = user;
    if (addFriend) {
      newUser.friendships.push(friend);
      setUser(newUser);
    } else {
      const updatedFriend = newUser?.friendships.filter((item: any) => {
        return item.to_user._id !== friend;
      });
      if (newUser.friendships) newUser.friendships = updatedFriend;
    }
  };
  return {
    user,
    loading,
    login,
    logout,
    updateUser,
    updateUserFriends,
  };
};
