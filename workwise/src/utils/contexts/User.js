import React, { createContext, useContext, useState } from "react";
export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("user") === null
      ? null
      : JSON.parse(localStorage.getItem("user")) 
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [focus, setFocus] = useState(
		localStorage.getItem("timer") === null ? false : true
	);
  const [baseUrl, setBaseUrl] = useState(process.env.REACT_APP_PRODUCTION==="true" ? process.env.REACT_APP_PRODUCTION_URL : process.env.REACT_APP_DEVELOPMENT_URL);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        focus,
        setFocus,
        baseUrl,
        setBaseUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
