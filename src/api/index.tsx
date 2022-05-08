import React from "react";
import { API_URLS } from "../util/index";
import { APIRES } from "./responseConstants";
import { getFormBody } from "../util/urlEncode";
interface configProp {
  headers: any;
  customConfig: any;
  body?: any;
}

const CustomFetch = async (url: any, { body, ...customConfig }: any) => {
  const headers = {
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
  console.log("ccc", config);
  try {
    const response = await fetch(url, config);
    const resData: APIRES = await response.json();
    console.log("///-", resData);
    if (resData.success) {
      return {
        data: resData.data,
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
  //let confirm_password = password.toString();
  //let name = "Pranay";
  return CustomFetch(API_URLS.login(), {
    method: "POST",
    body: { email, password },
  });
};
