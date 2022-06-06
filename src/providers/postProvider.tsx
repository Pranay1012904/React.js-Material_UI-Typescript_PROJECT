import { createContext } from "react";
import { useProvidePosts } from "../hooks/postProviderHook";
interface postType {
  posts: any[];
  loading: boolean;
  addPostsToState: (post: any) => void;
  addComment: (comment: string, postId: string) => void;
}
const initialState = {
  posts: [],
  loading: true,
  addPostsToState: (post: any) => {},
  addComment: (comment: string, postId: string) => {},
};

export const PostContext = createContext(initialState);
export const PostProvider = ({ children }: any) => {
  const posts: postType | any = useProvidePosts();
  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>;
};
