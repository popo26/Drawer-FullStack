import { createContext, useState, useContext, useEffect } from "react";

const DrawerNameContext = createContext("");

export const DrawerNameProvider = (props) => {
    const [drawerName, setDrawerName] = useState("");


    // useEffect(() => {
    //   const drawer = sessionStorage.getItem("drawerName");
    //   if (drawer) {
    //     setDrawerName(drawer);
    //   }
    // }, []);
  
    // useEffect(() => {
    //   sessionStorage.setItem("drawerName", drawerName);
    // }, [drawerName]);

  return (
    <DrawerNameContext.Provider
      value={[drawerName, setDrawerName]}
    >
      {props.children}
    </DrawerNameContext.Provider>
  );
};

export const useDrawerNameContext = () => {
  return useContext(DrawerNameContext);
};
