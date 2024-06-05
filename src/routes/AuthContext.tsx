import { createContext, useContext, useState, PropsWithChildren } from "react";

const INITIAL_LOGGED_IN = false;

const AuthContext = createContext({
  loggedInUser: INITIAL_LOGGED_IN,
  handleSetLoggedIn: () => {},
  handleSetLoggedOut: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loggedInUser, setLoggedInUser] = useState(INITIAL_LOGGED_IN);

  const handleSetLoggedIn = () => {
    setLoggedInUser(true);
  };
  const handleSetLoggedOut = () => {
    setLoggedInUser(false);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, handleSetLoggedIn, handleSetLoggedOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
