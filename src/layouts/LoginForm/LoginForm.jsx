import { useState } from "react";
import Input from "../../components/Input/Input";
import style from "./LoginForm.module.css";
import axios from "axios";
import { useUserStore } from "../../Store/userStore";
import { easeIn, easeOut, motion } from "framer-motion";
import HexButton from "../../components/HexButton/HexButton";
import { useNavigate } from "react-router-dom";
import { useLoadingStore } from "../../Store/loadingStore";
import { app } from "../../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNotificationStore } from "../../Store/notification";

function LoginForm() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const { setNotifications } = useNotificationStore();
  const { setLoadingWall } = useLoadingStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    username: false,
    password: false,
    network: false,
  });
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  async function signIn() {
    if (
      Object.entries(credentials).some((item) => {
        if (item[1] === "" || !item[1]) {
          setError({ ...error, [item[0]]: true });
          console.log(error);
          return true; // Returning true if the condition is met
        }
      })
    ) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}user/login`,
        credentials
      );
      if (response) {
        console.log(response.data);
        setUser(response.data);
        setNotifications(response.data.notifications);
        setLoading(false);
        setLoadingWall(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setError({ ...error, network: true });
      console.log(error);
      setLoading(false);
    }
  }

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await axios.post(
        ` ${import.meta.env.VITE_ENDPOINT}user/withGoogle`,
        {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }
      );
      if (res) {
        setUser(res.data);
        setLoading(false);
        setLoadingWall(true);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
      // toast.success(`Welcome Back ${res.data.firstName}`);

      navigate("/home");
    } catch (error) {
      console.log("could not sign in with google", error);
      // toast.error("Could not sign in with Google");
    }
  };
  return (
    <motion.div
      layout
      initial={{ x: -400 }}
      animate={{ x: 0 }}
      exit={{ x: -400 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className={style.loginFormContainer}
    >
      {error.network && <h1 style={{ color: "#ff1020" }}>Network Error</h1>}
      <div className={style.inputsContainer}>
        <Input
          value={credentials}
          setValue={setCredentials}
          label={"Username"}
          control={"username"}
          isDisabled={loading}
        />
        <Input
          value={credentials}
          setValue={setCredentials}
          label={"Password"}
          control={"password"}
          type="password"
          isDisabled={loading}
        />
      </div>
      <div className={style.btnsContainer}>
        <HexButton onClick={signIn} isDisabled={loading} text={"Sign In"} />
        <button onClick={handleGoogleClick} className={`${style.button}`}>
          Continue with google
        </button>
      </div>
    </motion.div>
  );
}

export default LoginForm;
