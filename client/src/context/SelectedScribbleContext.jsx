import { createContext, useState, useContext } from "react";

const SelectedScribbleContext = createContext("");

export const SelectedScribbleProvider = (props) => {
    const [selectedScribbleId, setSelectedScribbleId] = useState("");


  return (
    <SelectedScribbleContext.Provider
      value={[selectedScribbleId, setSelectedScribbleId]}
    >
      {props.children}
    </SelectedScribbleContext.Provider>
  );
};

export const useSelectedScribbleContext = () => {
  return useContext(SelectedScribbleContext);
};
