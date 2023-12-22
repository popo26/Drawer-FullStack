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
import { UserContextProvider } from "./context/UserContext";

export default function App() {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  // const [files, setFiles] = useState([]);
  let { drawers, scribbles, setDrawers, setScribbles } = useDataContext();
  // const [baseImage, setBaseImage] = useState("")
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
    isLoggedIn: false,
  });

  // useEffect(()=>{
  //   const userInBrowser = JSON.parse(localStorage.getItem("user"));
  //   setUser(userInBrowser)
  // }, [])

  console.log("User in APP", user)

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
      {/* <UserContextProvider> */}
      <DataProvider>
        <SelectedDrawerProvider>
          <SelectedScribbleProvider>
            <DrawerToBeMovedContextProvider>
              <DrawerNameProvider>
                <FileProvider>
                  <MyNavbar user={user} setUser={setUser} />
                  <AppRoutes
                    expandedIndex={expandedIndex}
                    handleExpand={handleClickExpand}
                    // files={files}
                    // setFiles={setFiles}
                    // baseImage={baseImage}
                    // setBaseImage={setBaseImage}
                    user={user}
                    setUser={setUser}
                  />
                  <Link to="/scribble">
                    {user.isLoggedIn && <ScribbleBtn />}
                  </Link>
                </FileProvider>
              </DrawerNameProvider>
            </DrawerToBeMovedContextProvider>
          </SelectedScribbleProvider>
        </SelectedDrawerProvider>
      </DataProvider>
      {/* </UserContextProvider> */}
    </>
  );
}
