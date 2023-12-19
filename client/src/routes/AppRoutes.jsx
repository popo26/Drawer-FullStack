import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../css/App.css";
import ScribbleBtn from "../components/ScribbleBtn";
import SearchPage from "../pages/SearchPage";
import PasswordResetPage from "../pages/PasswordResetPage";
import CreateDrawerPage from "../pages/CreateDrawerPage";
import ScribblePage from "../pages/ScribblePage";
import ProfilePage from "../pages/ProfilePage";
import ScribbleListPage from "../pages/ScribbleListPage";
import HomePage from "../pages/HomePage";
import DrawerListPage from "../pages/DrawerListPage";
import PerScribblePage from "../pages/PerScribblePage";

import SortDrawerPage from "../pages/SortDrawerPage";
import SortDrawerPreviewPage from "../pages/SortDrawerPreviewPage";
import TestPage from "../pages/TestPage";
import { PageNotFound } from "../pages/PageNotFound";
import SortScribblePage from "../pages/SortScribblePage";
import SortScribblePreviewPage from "../pages/SortScribblePreviewPage";
import MyNavbar from "../components/MyNavbar";
import LandingPage from "../pages/LandingPage";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useHistory, useContext } from "react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminPage from "../pages/AdminPage";
import PrivateRoute from "../hocs/PrivateRoute";
import UnPrivateRoute from "../hocs/UnPrivateRoute";

export default function AppRoutes({
  expandedIndex,
  handleExpand,
  files,
  setFiles,
  // baseImage,
  // setBaseImage
  isUserLoggedIn,
  setIsUserLoggedIn,
}) {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  return (
    <div>
      <Routes>
        {/* <MyNavbar /> */}

        <Route
          index
          element={
            <LandingPage
              // expandedIndex={expandedIndex}
              // handleExpand={handleExpand}
              isUserLoggedIn={isUserLoggedIn}
              setIsUserLoggedIn={setIsUserLoggedIn}
            />
          }
        ></Route>

        <Route
          path="/login"
          element={
            <UnPrivateRoute><LoginPage
              isUserLoggedIn={isUserLoggedIn}
              setIsUserLoggedIn={setIsUserLoggedIn}
            /></UnPrivateRoute>
          }
        ></Route>
        {/* <Route
          path="/login"
          element={
            <LoginPage
              isUserLoggedIn={isUserLoggedIn}
              setIsUserLoggedIn={setIsUserLoggedIn}
            />
          }
        ></Route> */}
        <Route
          path="/register"
          element={
            <UnPrivateRoute><RegisterPage
              isUserLoggedIn={isUserLoggedIn}
              setIsUserLoggedIn={setIsUserLoggedIn}
            /></UnPrivateRoute>
          }
        ></Route>

        <Route
          path="/home"
          // roles={["user", "admin"]}
          element={
            <PrivateRoute isUserLoggedIn={isUserLoggedIn}>
              <HomePage
                expandedIndex={expandedIndex}
                handleExpand={handleExpand}
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            </PrivateRoute>
          }
        ></Route>

        {/* <Route
          path="/home"
          element={
            <HomePage
              expandedIndex={expandedIndex}
              handleExpand={handleExpand}
              isUserLoggedIn={isUserLoggedIn}
              setIsUserLoggedIn={setIsUserLoggedIn}
            />
          }
        ></Route> */}
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <SearchPage
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/scribble"
          // element={<ScribblePage files={files} setFiles={setFiles} />}
          element={
            <PrivateRoute>
              <ScribblePage
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/stray"
          element={
            <PrivateRoute>
              <ScribbleListPage
                files={files}
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            </PrivateRoute>
          }
          // element={<ScribbleListPage baseImage={baseImage} setBaseImage={setBaseImage}/>}
        ></Route>
        <Route
          path="/scribble/:id"
          element={
            <PrivateRoute>
              <PerScribblePage
                files={files}
                setFiles={setFiles}
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            </PrivateRoute>
          }
          // element={<PerScribblePage baseImage={baseImage} setBaseImage={setBaseImage}/>}
        ></Route>
        <Route
          path="/sort"
          element={
            <PrivateRoute>
              <SortScribblePage
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/sort-preview"
          element={
            <PrivateRoute>
              <SortScribblePreviewPage
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/sort-drawer"
          element={
            <PrivateRoute>
              <SortDrawerPage
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/sort-drawer-preview"
          element={
            <PrivateRoute>
              <SortDrawerPreviewPage
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/password-reset"
          element={
            <PrivateRoute>
              <PasswordResetPage
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateDrawerPage
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/drawer-list/:id"
          element={
            <PrivateRoute>
              <DrawerListPage
                expandedIndex={expandedIndex}
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/test"
          // element={<TestPage files={files} setFiles={setFiles} />}
          element={<TestPage />}
        ></Route>
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={["admin"]}>
              <AdminPage
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            </PrivateRoute>
          }
        ></Route>

        {/* <Route
          path="/admin"
          element={
            <AdminPage
              isUserLoggedIn={isUserLoggedIn}
              setIsUserLoggedIn={setIsUserLoggedIn}
            />
          }
        ></Route> */}

        <Route
          path="*"
          element={
            <PrivateRoute>
              <PageNotFound
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

///////////////////ORIGINAL/////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import "../css/App.css";
// import ScribbleBtn from "../components/ScribbleBtn";
// import SearchPage from "../pages/SearchPage";
// import PasswordResetPage from "../pages/PasswordResetPage";
// import CreateDrawerPage from "../pages/CreateDrawerPage";
// import ScribblePage from "../pages/ScribblePage";
// import ProfilePage from "../pages/ProfilePage";
// import ScribbleListPage from "../pages/ScribbleListPage";
// import HomePage from "../pages/HomePage";
// import DrawerListPage from "../pages/DrawerListPage";
// import PerScribblePage from "../pages/PerScribblePage";

// import SortDrawerPage from "../pages/SortDrawerPage";
// import SortDrawerPreviewPage from "../pages/SortDrawerPreviewPage";
// import TestPage from "../pages/TestPage";
// import { PageNotFound } from "../pages/PageNotFound";
// import SortScribblePage from "../pages/SortScribblePage";
// import SortScribblePreviewPage from "../pages/SortScribblePreviewPage";
// import MyNavbar from "../components/MyNavbar";
// import LandingPage from "../pages/LandingPage";
// import { AuthContext } from "../context/AuthContext";
// import { useEffect, useHistory, useContext } from "react";
// import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";
// import AdminPage from "../pages/AdminPage";

// export default function AppRoutes({
//   expandedIndex,
//   handleExpand,
//   files,
//   setFiles,
//   // baseImage,
//   // setBaseImage
//   isUserLoggedIn,
//   setIsUserLoggedIn,
// }) {
//   const { user, setUser, isAuthenticated, setIsAuthenticated } =
//     useContext(AuthContext);

//   return (
//     <div>
//       <Routes>
//         {/* <MyNavbar /> */}

//         <Route
//           index
//           element={
//             <LandingPage
//               // expandedIndex={expandedIndex}
//               // handleExpand={handleExpand}
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         ></Route>

//         <Route
//           path="/login"
//           element={
//             <LoginPage
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         ></Route>
//         <Route
//           path="/register"
//           element={
//             <RegisterPage
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         ></Route>
//         <Route
//           path="/home"
//           element={
//             <HomePage
//               expandedIndex={expandedIndex}
//               handleExpand={handleExpand}
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         ></Route>
//         <Route
//           path="/search"
//           element={
//             <SearchPage
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         ></Route>
//         <Route
//           path="/scribble"
//           // element={<ScribblePage files={files} setFiles={setFiles} />}
//           element={
//             <ScribblePage
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         ></Route>
//         <Route
//           path="/profile"
//           element={
//             <ProfilePage
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         ></Route>
//         <Route
//           path="/stray"
//           element={
//             <ScribbleListPage
//               files={files}
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//           // element={<ScribbleListPage baseImage={baseImage} setBaseImage={setBaseImage}/>}
//         ></Route>
//         <Route
//           path="/scribble/:id"
//           element={
//             <PerScribblePage
//               files={files}
//               setFiles={setFiles}
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//           // element={<PerScribblePage baseImage={baseImage} setBaseImage={setBaseImage}/>}
//         ></Route>
//         <Route
//           path="/sort"
//           element={
//             <SortScribblePage
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         ></Route>
//         <Route
//           path="/sort-preview"
//           element={
//             <SortScribblePreviewPage
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         ></Route>

//         <Route
//           path="/sort-drawer"
//           element={
//             <SortDrawerPage
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         ></Route>
//         <Route
//           path="/sort-drawer-preview"
//           element={
//             <SortDrawerPreviewPage
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         ></Route>

//         <Route
//           path="/password-reset"
//           element={
//             <PasswordResetPage
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         ></Route>
//         <Route
//           path="/create"
//           element={
//             <CreateDrawerPage
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         ></Route>
//         <Route
//           path="/drawer-list/:id"
//           element={
//             <DrawerListPage
//               expandedIndex={expandedIndex}
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         ></Route>
//         <Route
//           path="/test"
//           // element={<TestPage files={files} setFiles={setFiles} />}
//           element={<TestPage />}
//         ></Route>
//         <Route
//           path="/admin"
//           element={
//             <AdminPage
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         ></Route>
//         <Route
//           path="*"
//           element={
//             <PageNotFound
//               isUserLoggedIn={isUserLoggedIn}
//               setIsUserLoggedIn={setIsUserLoggedIn}
//             />
//           }
//         />
//       </Routes>
//     </div>
//   );
// }
