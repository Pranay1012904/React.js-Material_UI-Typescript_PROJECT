import { createContext } from "react";
import { useProviderAuth } from "../hooks";

interface myProp {
  user: any;
  login: (email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
  updateUser: (
    userId: string,
    name: string,
    password: string,
    confirm_password: string
  ) => void;
}
const initialState = {
  user: null,
  login: (email: string, password: string) => {},
  logout: () => {},
  loading: true,
  updateUser: (
    userId: string,
    name: string,
    password: string,
    confirm_password: string
  ) => {},
};

export const AuthContext = createContext(initialState);

export const AuthProvider: React.FunctionComponent<any> = ({ children }) => {
  const auth: myProp = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
