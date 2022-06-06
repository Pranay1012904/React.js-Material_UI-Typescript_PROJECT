import { useState, useContext, useEffect } from "react";
import { PostContext } from "../providers/postProvider";
import { GetPosts } from "../api";
export const usePosts = () => {
  return useContext(PostContext);
};
export const useProvidePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const resp = GetPosts(1, 10);
    resp
      .then((response: any) => {
        console.log("----", response);
        return response.data;
      })
      .then((data: any) => {
        setPosts(data.posts);
        setLoading(false);
      });
  }, []);

  const addPostToState = (post: any) => {
    const newPosts: any = [post, ...posts];
    setPosts(newPosts);
  };
  return {
    data: posts,
    loading,
    addPostToState,
  };
};
