import { useEffect } from "react";
import "./App.css";
import { useUserStore } from "./Store/userStore";
import axios from "axios";
import AppRoutes from "./AppRoutes";
import { useLoadingStore } from "./Store/loadingStore";
import LoadingBar from "react-top-loading-bar";
import LoadingWall from "./components/LoadingWall/LoadingWall";
import { AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import CustomToast from "./components/CustomToast/CustomToast";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "./Store/notification";
import { useChatStore } from "./Store/publicChat";
import { useErrorStore } from "./Store/errorStore";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

// export const socket = io(import.meta.env.VITE_SOCKET);
export const socket = io("wss://nexus-backend-p3y6.onrender.com");

axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();
  const { privateChatOpen } = useChatStore();
  const { user, setUser } = useUserStore();
  const { setNotifications } = useNotificationStore();
  const { error, setError } = useErrorStore();
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
          setNotifications(response.data.notifications);
          setLoading(false);
        } else {
          setLoading(false);
          setError(true);
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

  useEffect(() => {
    if (user) {
      socket.on("connect", () => {});
      socket.emit("join-room", user.username);

      socket.on("friend-add-receive", (data) => {
        toast(
          <CustomToast
            onClick={() => navigate(`/profile/${data.sender}`)}
            message={data.message}
          />,
          {
            position: "top-right",
          }
        );
        setNotifications((prevNotifications) => [...prevNotifications, data]);
      });
      socket.on("receive-message", (data) => {
        if (!privateChatOpen) {
          toast(
            <CustomToast
              onClick={() => navigate(`/chat`)}
              message={`${data.sender} : ${data.message}`}
            />,
            {
              position: "top-right",
            }
          );
        }
      });
    }
  }, [socket, user]);

  return (
    <>
      <AnimatePresence>
        {loadingWall && <LoadingWall key={"Loading-Wall"} />}
        {error && (
          <ErrorPage
            code={500}
            text={"Internal Server Error!"}
            key={"Error Page"}
          />
        )}
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
