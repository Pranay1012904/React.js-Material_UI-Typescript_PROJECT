import { createContext } from "react";
import { useProviderAuth } from "../hooks";

interface myProp {
  user: null;
  login: () => void;
  logout: () => void;
  loading: boolean;
}
const initialState = {
  user: null,
  login: (email: string, password: string) => {},
  logout: () => {},
  loading: true,
};

export const AuthContext = createContext(initialState);

export const AuthProvider: React.FunctionComponent<any> = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
