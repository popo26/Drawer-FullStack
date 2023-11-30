import { createContext, useState, useContext } from "react";

const DrawerToBeMovedContext = createContext("");

export const DrawerToBeMovedContextProvider = (props) => {
    const [drawerToBeMoved, setDrawerToBeMoved] = useState("");


  return (
    <DrawerToBeMovedContext.Provider
      value={[drawerToBeMoved, setDrawerToBeMoved]}
    >
      {props.children}
    </DrawerToBeMovedContext.Provider>
  );
};

export const useDrawerToBeMovedContext = () => {
  return useContext(DrawerToBeMovedContext);
};
