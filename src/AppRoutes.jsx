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
import SinglePost from "./pages/SinglePost/SinglePost";
import ProfilePage from "./pages/Profile Page/ProfilePage";
import NavBar from "./components/NavBar/NavBar";
import SearchResult from "./pages/SearchResult/SearchResult";
import ChatPage from "./pages/ChatPage/ChatPage";
import LandingPage from "./pages/LandingPage/LandingPage";
function AppRoutes() {
  const { user } = useUserStore();
  return (
    <Routes>
      <Route path="/welcome" element={<LandingPage />} />
      <Route path="/login" element={<Registration />} />
      <Route
        element={<ProtectedRoute isAllowed={user} redirectPath="/welcome" />}
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
          <Route path="/select-games" element={<GamesPage />} />
        </Route>
        route
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<FYPage />} />
          <Route path="explore" element={<ExplorePage />} />
          {/* <Route path="fypage" element={<FYPage />} /> */}
        </Route>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/" element={<NavBar outlet />}>
          <Route path="comments/:postId" element={<SinglePost />} />
          <Route path="myProfile" element={<ProfilePage />} />
          <Route path="profile/:username" element={<ProfilePage />} />
          <Route path="/post/:post_id?" element={<CreatePost />} />
        </Route>
        <Route path="/search/:search?" element={<SearchResult />} />
      </Route>

      <Route
        path="/*"
        element={<ErrorPage code="404" text={"Page not found"} />}
      />
    </Routes>
  );
}

export default AppRoutes;
