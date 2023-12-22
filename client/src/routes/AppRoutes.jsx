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
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import LandingPage from "../pages/LandingPage";
import PrivateRoute from "../hocs/PrivateRoute";
import UnPrivateRoute from "../hocs/UnPrivateRoute";

export default function AppRoutes({
  expandedIndex,
  handleExpand,
  files,
  setFiles,
  // baseImage,
  // setBaseImage
  user,
  setUser,
}) {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <UnPrivateRoute user={user}>
              <LoginPage user={user} setUser={setUser} />
            </UnPrivateRoute>
          }
        ></Route>

        {/* <Route
          path="/login"
          element={<LoginPage user={user} setUser={setUser} />}
        ></Route> */}

        <Route
          path="/register"
          element={
            <UnPrivateRoute user={user}>
              <RegisterPage user={user} setUser={setUser} />
            </UnPrivateRoute>
          }
        ></Route>
        <Route index element={<LandingPage />}></Route>

        {/* <Route
          path="/register"
          element={<RegisterPage user={user} setUser={setUser} />}
        ></Route>
        <Route index element={<LandingPage />}></Route> */}

        <Route
          path="/home"
          element={
            <PrivateRoute user={user}>
              <HomePage
                expandedIndex={expandedIndex}
                handleExpand={handleExpand}
                user={user}
                setUser={setUser}
              />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <PrivateRoute user={user}>
              <SearchPage user={user} setUser={setUser} />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/scribble"
          // element={<ScribblePage files={files} setFiles={setFiles} />}
          element={
            <PrivateRoute user={user}>
              <ScribblePage user={user} setUser={setUser} />{" "}
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute user={user}>
              <ProfilePage user={user} setUser={setUser} />{" "}
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/stray"
          element={
            <PrivateRoute user={user}>
              <ScribbleListPage files={files} user={user} setUser={setUser} />{" "}
            </PrivateRoute>
          }
          // element={<ScribbleListPage baseImage={baseImage} setBaseImage={setBaseImage}/>}
        ></Route>
        <Route
          path="/scribble/:id"
          element={
            <PrivateRoute user={user}>
              <PerScribblePage
                files={files}
                setFiles={setFiles}
                user={user}
                setUser={setUser}
              />
            </PrivateRoute>
          }
          // element={<PerScribblePage baseImage={baseImage} setBaseImage={setBaseImage}/>}
        ></Route>
        <Route
          path="/sort"
          element={
            <PrivateRoute user={user}>
              <SortScribblePage user={user} setUser={setUser} />{" "}
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/sort-preview"
          element={
            <PrivateRoute user={user}>
              <SortScribblePreviewPage user={user} setUser={setUser} />{" "}
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/sort-drawer"
          element={
            <PrivateRoute user={user}>
              <SortDrawerPage user={user} setUser={setUser} />{" "}
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/sort-drawer-preview"
          element={
            <PrivateRoute user={user}>
              <SortDrawerPreviewPage user={user} setUser={setUser} />{" "}
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/password-reset"
          element={
            <PrivateRoute user={user}>
              <PasswordResetPage user={user} setUser={setUser} />{" "}
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/create"
          element={
            <PrivateRoute user={user}>
              <CreateDrawerPage user={user} setUser={setUser} />{" "}
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/drawer-list/:id"
          element={
            <PrivateRoute user={user}>
              <DrawerListPage
                expandedIndex={expandedIndex}
                user={user}
                setUser={setUser}
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
          path="*"
          element={
            <PrivateRoute user={user}>
              <PageNotFound />{" "}
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

//////Without protected route
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
// import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";
// import LandingPage from "../pages/LandingPage";
// import PrivateRoute from "../hocs/PrivateRoute";
// import UnPrivateRoute from "../hocs/UnPrivateRoute";

// export default function AppRoutes({
//   expandedIndex,
//   handleExpand,
//   files,
//   setFiles,
//   // baseImage,
//   // setBaseImage
//   user,
//   setUser,
// }) {
//   return (
//     <div>
//       <Routes>
//         <Route
//           path="/login"
//           element={
//             <UnPrivateRoute user={user}>
//               <LoginPage user={user} setUser={setUser} />
//             </UnPrivateRoute>
//           }
//         ></Route>

//         {/* <Route
//           path="/login"
//           element={<LoginPage user={user} setUser={setUser} />}
//         ></Route> */}

//         <Route
//           path="/register"
//           element={
//             <UnPrivateRoute user={user}>
//               <RegisterPage user={user} setUser={setUser} />
//             </UnPrivateRoute>
//           }
//         ></Route>
//         <Route index element={<LandingPage />}></Route>

//         {/* <Route
//           path="/register"
//           element={<RegisterPage user={user} setUser={setUser} />}
//         ></Route>
//         <Route index element={<LandingPage />}></Route> */}

//         <Route
//           path="/home"
//           element={
//             <HomePage
//               expandedIndex={expandedIndex}
//               handleExpand={handleExpand}
//               user={user}
//               setUser={setUser}
//             />
//           }
//         />
//         <Route
//           path="/search"
//           element={<SearchPage user={user} setUser={setUser} />}
//         />
//         <Route
//           path="/scribble"
//           // element={<ScribblePage files={files} setFiles={setFiles} />}
//           element={<ScribblePage user={user} setUser={setUser} />}
//         />
//         <Route
//           path="/profile"
//           element={
//             <PrivateRoute user={user}>
//               <ProfilePage user={user} setUser={setUser} />{" "}
//             </PrivateRoute>
//           }
//         ></Route>
//         <Route
//           path="/stray"
//           element={
//             <PrivateRoute>
//               <ScribbleListPage files={files} user={user} setUser={setUser} />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/scribble/:id"
//           element={
//             <PerScribblePage
//               files={files}
//               setFiles={setFiles}
//               user={user}
//               setUser={setUser}
//             />
//           }
//         />
//         <Route
//           path="/sort"
//           element={<SortScribblePage user={user} setUser={setUser} />}
//         />
//         <Route
//           path="/sort-preview"
//           element={<SortScribblePreviewPage user={user} setUser={setUser} />}
//         />

//         <Route
//           path="/sort-drawer"
//           element={<SortDrawerPage user={user} setUser={setUser} />}
//         />
//         <Route
//           path="/sort-drawer-preview"
//           element={<SortDrawerPreviewPage user={user} setUser={setUser} />}
//         />

//         <Route
//           path="/password-reset"
//           element={<PasswordResetPage user={user} setUser={setUser} />}
//         />
//         <Route
//           path="/create"
//           element={<CreateDrawerPage user={user} setUser={setUser} />}
//         />
//         <Route
//           path="/drawer-list/:id"
//           element={
//             <DrawerListPage
//               expandedIndex={expandedIndex}
//               user={user}
//               setUser={setUser}
//             />
//           }
//         ></Route>
//         <Route path="/test" element={<TestPage />} />
//         <Route
//           path="*"
//           element={<PageNotFound user={user} setUser={setUser} />}
//         />
//       </Routes>
//     </div>
//   );
// }
