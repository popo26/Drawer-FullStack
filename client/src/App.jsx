import { useState, useEffect, useMemo } from "react";
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
import { FileProvider } from "./context/FileContext";
// import { AuthContextProvider } from "./context/AuthContext";

export default function App() {
  const [expandedIndex, setExpandedIndex] = useState(-1);
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

  return (
    <>
      {/* <AuthContextProvider> */}
        <DataProvider>
          <SelectedDrawerProvider>
            <SelectedScribbleProvider>
              <DrawerToBeMovedContextProvider>
                <DrawerNameProvider>
                  <FileProvider>
                    <MyNavbar />
                    <AppRoutes
                      expandedIndex={expandedIndex}
                      handleExpand={handleClickExpand}
                      // files={files}
                      // setFiles={setFiles}
                      // baseImage={baseImage}
                      // setBaseImage={setBaseImage}
                    />
                    <Link to="/scribble">
                      <ScribbleBtn />
                    </Link>
                  </FileProvider>
                </DrawerNameProvider>
              </DrawerToBeMovedContextProvider>
            </SelectedScribbleProvider>
          </SelectedDrawerProvider>
        </DataProvider>
      {/* </AuthContextProvider> */}
    </>
  );
}
