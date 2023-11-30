import { createContext, useState, useContext } from "react";

const SelectedDrawerContext = createContext("");

export const SelectedDrawerProvider = (props) => {
  const [selectedDrawerId, setSelectedDrawerId] = useState("");
  const handleSelectedDrawerId = (id) => {
    setSelectedDrawerId(id);
  };

  return (
    <SelectedDrawerContext.Provider
      value={{ selectedDrawerId, handleSelectedDrawerId }}
    >
      {props.children}
    </SelectedDrawerContext.Provider>
  );
};

export const useSelectedDrawerContext = () => {
  return useContext(SelectedDrawerContext);
};
