import { useState } from "react";
import Input from "../../components/Input/Input";
import style from "./LoginForm.module.css";
import axios from "axios";
import { useUserStore } from "../../Store/userStore";
import { easeIn, easeOut, motion } from "framer-motion";
import HexButton from "../../components/HexButton/HexButton";

function LoginForm() {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ username: false, password: false });
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  async function signIn() {
    if (
      Object.entries(newUser).some((item) => {
        if (item[1] === "" || !item[1]) {
          setError({ ...error, [item[0]]: true });
          console.log(error);
          return true; // Returning true if the condition is met
        }
        // return false; // Returning false if the condition is not met
      })
    )
      setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}user/login`,
        credentials
      );
      if (response) {
        setUser(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <motion.div
      layout
      initial={{ x: -400 }}
      animate={{ x: 0 }}
      exit={{ x: -400 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className={style.loginFormContainer}
    >
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
        {/* <button className={style.googleBtn}>
    <span className={style.googleBtnText}></span>
  </button> */}
      </div>
    </motion.div>
  );
}

export default LoginForm;
