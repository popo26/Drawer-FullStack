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

export default function AppRoutes({
  expandedIndex,
  handleExpand,
  files,
  setFiles,
}) {
  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <HomePage
              expandedIndex={expandedIndex}
              handleExpand={handleExpand}
            />
          }
        ></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route
          path="/scribble"
          element={<ScribblePage files={files} setFiles={setFiles} />}
        ></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route
          path="/stray"
          element={<ScribbleListPage files={files} />}
        ></Route>
        <Route
          path="/scribble/:id"
          element={<PerScribblePage files={files} setFiles={setFiles} />}
        ></Route>
        <Route
          path="/sort"
          element={
            <SortScribblePage
            />
          }
        ></Route>
        <Route
          path="/sort-preview"
          element={<SortScribblePreviewPage />}
        ></Route>

        <Route
          path="/sort-drawer"
          element={
            <SortDrawerPage
            />
          }
        ></Route>
        <Route
          path="/sort-drawer-preview"
          element={
            <SortDrawerPreviewPage
            />
          }
        ></Route>

        <Route path="/password-reset" element={<PasswordResetPage />}></Route>
        <Route
          path="/create"
          element={
            <CreateDrawerPage
            />
          }
        ></Route>
        <Route
          path="/drawer-list/:id"
          element={
            <DrawerListPage
              expandedIndex={expandedIndex}
            />
          }
        ></Route>
        {/* TEST */}
        <Route
          path="/test"
          element={<TestPage files={files} setFiles={setFiles} />}
        ></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
