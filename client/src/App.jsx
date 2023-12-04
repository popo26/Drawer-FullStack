import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import MyNavbar from "./components/MyNavbar";
import ScribbleBtn from "./components/ScribbleBtn";
import "./css/App.css";
import { DataProvider } from "./context/DataContext";
import { SelectedDrawerProvider } from "./context/SelectedDrawerContext";
import { SelectedScribbleProvider } from "./context/SelectedScribbleContext";
import { DrawerToBeMovedContextProvider } from "./context/DrawerToBeMovedContext";
import { DrawerNameProvider } from "./context/DrawerNameContext";
import { useDataContext } from "./context/DataContext";
import {getUsers, getDrawers, getScribbles} from "./utils/getData";



export default function App() {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [files, setFiles] = useState([]);
  let { drawers, scribbles, setDrawers, setScribbles } = useDataContext();


  const handleClickExpand = (passedIndex) => {
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex === passedIndex) {
        return -1;
      } else {
        return passedIndex;
      }
    });
  };

  // useEffect(()=>{
  //   const drawersArray = getDrawers();
  //   const scribblesArray = getScribbles();
    
  //   sessionStorage.setItem("drawers", JSON.stringify(drawersArray));
  //   // setDrawers(sessionStorage.setItem("drawers", JSON.stringify(drawers)))
  //   sessionStorage.setItem("scribbles", JSON.stringify(scribblesArray))
  //   // setScribbles(sessionStorage.setItem("scribbles", JSON.stringify(scribbles)))
  //   setDrawers(drawersArray);
  //   setScribbles(scribblesArray)
  // }, [])

  return (
    <>
      <DataProvider>
        <SelectedDrawerProvider>
          <SelectedScribbleProvider>
            <DrawerToBeMovedContextProvider>
              <DrawerNameProvider>
                <MyNavbar />
                <AppRoutes
                  expandedIndex={expandedIndex}
                  handleExpand={handleClickExpand}
                  files={files}
                  setFiles={setFiles}
                />
                <Link to="/scribble">
                  <ScribbleBtn />
                </Link>
              </DrawerNameProvider>
            </DrawerToBeMovedContextProvider>
          </SelectedScribbleProvider>
        </SelectedDrawerProvider>
      </DataProvider>
    </>
  );
}
