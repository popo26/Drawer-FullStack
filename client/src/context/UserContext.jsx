import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext("");

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/users/authenticated")
      .then((data) => console.log(data.json()))
      .then((json) => {
        if (isAuthenticated) {
          setUser(json.user);
          setIsAuthenticated(true);
          setIsLoaded(true);
          setUser({...user, isLoggedIn:true})
          localStorage.setItem("user", JSON.stringify(user))
        }
      });
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <h1>Loading</h1>
      ) : (
        <UserContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {props.children}
        </UserContext.Provider>
      )}
    </div>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
