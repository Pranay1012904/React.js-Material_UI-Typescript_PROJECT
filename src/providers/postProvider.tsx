import { createContext } from "react";
import { useProvidePosts } from "../hooks/postProviderHook";

interface postType {
  data: null;
  loading: boolean;
  addPostToState: (post: any) => void;
}

const initialState = {
  data: [],
  loading: true,
  addPostToState: (post: any) => {},
};
export const PostContext = createContext(initialState);
export const PostProvider = ({ children }: any) => {
  const posts: any = useProvidePosts();
  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>;
};
