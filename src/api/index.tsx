import { API_URLS } from "../util/index";
import { APIRES } from "./responseConstants";
import { getFormBody } from "../util/urlEncode";
import { LOCALSTORAGE_TOKEN_KEY } from "../util";
interface configProp {
  headers: any;
  customConfig: any;
  body?: any;
}

const CustomFetch = async (url: any, { body, ...customConfig }: any) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  const headers = {
    Authorization: `Bearer ${token}`,
    "content-type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  };

  const config: configProp = {
    headers,
    ...customConfig,
  };
  if (body) {
    config.body = getFormBody(body);
  }
  //console.log("ccc", config);
  //console.log("uuu", url);
  try {
    const response = await fetch(url, config);
    const resData: APIRES = await response.json();
    //console.log("///-", resData);
    if (resData.success) {
      return {
        data: resData.data, //in case of editUser data has token & user
        message: resData.message,
        success: resData.success,
      };
    } else {
      return {
        message: resData.message,
        success: resData.success,
      };
    }
  } catch (err: any) {
    return {
      error: err,
    };
  }
};

export const GetPosts = (page: number, limit: number) => {
  return CustomFetch(API_URLS.posts(page, limit), {
    method: "GET",
  });
};

export const UserLogin = (email: string, password: string) => {
  return CustomFetch(API_URLS.login(), {
    method: "POST",
    body: { email, password },
  });
};

export const EditProfile = (
  userId: string,
  name: string,
  password: string,
  confirm_password: string
) => {
  return CustomFetch(API_URLS.editUser(), {
    method: "POST",
    body: { id: userId, password, confirm_password, name },
  });
};
//userInfo: (userId: any) => `${API_ROOT}/users/${userId}`,

export const fetchUserInfo = (userId: string) => {
  console.log("api---", userId);
  return CustomFetch(API_URLS.userInfo(userId), {
    method: "GET",
  });
};

export const fetchFriends = () => {
  return CustomFetch(API_URLS.friends(), {
    method: "GET",
  });
};

export const addFriend = (userId: string) => {
  return CustomFetch(API_URLS.createFriendship(userId), {
    method: "POST",
  });
};

export const removeFriend = (userId: string) => {
  return CustomFetch(API_URLS.removeFriend(userId), {
    method: "POST",
  });
};

export const addNewPost = (content: string) => {
  return CustomFetch(API_URLS.createPost(), {
    method: "POST",
    body: { content },
  });
};
