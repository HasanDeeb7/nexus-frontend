import React from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import UploadImage from "./pages/upload Image/UploadImage";
import VerifyAccount from "./pages/Verify Account/VerifyAccount";
import ProtectedRoute from "./ProtectedRoutes";
import { useUserStore } from "./Store/userStore";
import GamesPage from "./pages/Games Page/GamesPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import SideBar from "./components/SideBar/SideBar";
import ExplorePage from "./pages/Explore Page/ExplorePage";
import FYPage from "./pages/ForYou Page/FYPage";
import Layout from "./layouts/Page Layout/Layout";
import CreatePost from "./pages/Create Post/CreatePost";
function AppRoutes() {
  const { user } = useUserStore();
  return (
    <Routes>
      <Route path="/login" element={<Registration />} />
      <Route
        element={<ProtectedRoute isAllowed={user} redirectPath="/login" />}
      >
        <Route path="/verify" element={<VerifyAccount />} />
        <Route
          element={
            <ProtectedRoute
              isAllowed={user && user.isVerified}
              redirectPath="/verify"
            />
          }
        >
          <Route path="/avatar" element={<UploadImage />} />
          <Route path="/games-select" element={<GamesPage />} />
        </Route>
        route
        <Route path="/" element={<Layout />}>
          <Route path="fypage" element={<FYPage />} />
          <Route path="explore" element={<ExplorePage />} />
          {/* <Route path="chat" element={<FYPage />} />
          <Route path="fypage" element={<FYPage />} /> */}
        </Route>
        <Route path="/post" element={<CreatePost />} />
      </Route>

      <Route
        path="/*"
        element={<ErrorPage code="404" text={"Page not found"} />}
      />
    </Routes>
  );
}

export default AppRoutes;
