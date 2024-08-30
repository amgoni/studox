/* eslint-disable react/prop-types */
import React, { useState, useCallback } from "react";

const AuthContext = React.createContext({
  token: "",
  userId: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const retrieveStoredUserId = () => {
  const storedUserId = localStorage.getItem("userId");
  return {
    userId: storedUserId,
  };
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  return {
    token: storedToken,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  const userIdData = retrieveStoredUserId();

  let initialToken;
  let initialUserId;

  if (tokenData) {
    initialToken = tokenData.token;
  }

  if (userIdData) {
    initialUserId = userIdData.userId;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }, []);

  const loginHandler = (token, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
  };

  const contextValue = {
    token: token,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
