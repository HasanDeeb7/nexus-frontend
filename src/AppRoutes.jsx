import React from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import UploadImage from "./pages/upload Image/UploadImage";
import VerifyAccount from "./pages/Verify Account/VerifyAccount";
import ProtectedRoute from "./ProtectedRoutes";
import { useUserStore } from "./Store/userStore";
import GamesPage from "./pages/Games Page/GamesPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
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
      </Route>
      <Route
        path="/*"
        element={<ErrorPage code="404" text={"Page not found"} />}
      />
    </Routes>
  );
}

export default AppRoutes;
