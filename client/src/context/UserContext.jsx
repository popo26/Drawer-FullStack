import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext("");

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    isLoggedIn: false,
  });
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const userInBrowser = JSON.parse(localStorage.getItem("user"));
    console.log("user in Scribble List", userInBrowser);
    if (userInBrowser) {
      setUser(userInBrowser);
    }
  }, []);

  return (
    // <div>
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
    // </div>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
