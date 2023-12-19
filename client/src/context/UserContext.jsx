import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext("");

export const UserProvider = (props) => {
    //const [loggedInUser, setLoggedInUser] = useState("");
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  
    // useEffect(() => {
    //   const loggedInUser = JSON.parse(sessionStorage.getItem("user"));
    // }, []);

  return (
    <UserContext.Provider
      value={{loggedInUser, setLoggedInUser}}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
