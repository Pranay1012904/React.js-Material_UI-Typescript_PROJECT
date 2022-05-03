import React from "react";
import { API_URLS } from "../util/index";
import { APIRES } from "./responseConstants";

const CustomFetch = async (url: any, { body, ...customConfig }: any) => {
  const headers = {
    "content-type": "application/json",
    Accept: "application/json",
  };
  const config = {
    headers,
    ...customConfig,
  };
  try {
    const response = await fetch(url, config);
    const resData: APIRES = await response.json();
    console.log("///-", resData.data);
    if (resData.success) {
      return {
        data: resData.data,
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
    body: "NaN",
    method: "GET",
  });
};
