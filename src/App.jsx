import { useEffect, useState } from "react";
import "./App.css";
import { useUserStore } from "./Store/userStore";
import axios from "axios";
import AppRoutes from "./AppRoutes";
import { useLoadingStore } from "./Store/loadingStore";
import LoadingBar from "react-top-loading-bar";
import LoadingWall from "./components/LoadingWall/LoadingWall";
import { AnimatePresence } from "framer-motion";

axios.defaults.withCredentials = true;
function App() {
  const { user, setUser } = useUserStore();
  const { proggressBar, setProgress, loadingWall, loading, setLoading } =
    useLoadingStore();

  async function getUser() {
    setLoading(true);
    try {
      if (!user) {
        const response = await axios.post(
          `${import.meta.env.VITE_ENDPOINT}user/login`
        );
        if (response) {
          setUser(response.data);
          setLoading(false);
        } else {
          console.log("No data");
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <AnimatePresence>
        {loadingWall && <LoadingWall key={"Loading-Wall"} />}
        {!loading ? (
          <>
            <LoadingBar
              color="#c641b5"
              progress={proggressBar}
              onLoaderFinished={() => setProgress(0)}
            />
            <AppRoutes />
          </>
        ) : (
          <LoadingWall key={"Loading-Wallv2"} />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
