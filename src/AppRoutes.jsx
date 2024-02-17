import React from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import UploadImage from "./pages/upload Image/UploadImage";
import VerifyAccount from "./pages/Verify Account/VerifyAccount";
import ProtectedRoute from "./ProtectedRoutes";
import { useUserStore } from "./Store/userStore";
function AppRoutes() {
  const { user } = useUserStore();
  return (
    <Routes>
      <Route path="/login" element={<Registration />} />
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
      </Route>
    </Routes>
  );
}

export default AppRoutes;
