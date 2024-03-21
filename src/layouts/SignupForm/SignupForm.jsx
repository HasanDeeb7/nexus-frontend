import React, { useState } from "react";
import { motion } from "framer-motion";
import style from "./SignupForm.module.css";
import Input from "../../components/Input/Input";
import HexButton from "../../components/HexButton/HexButton";
import axios from "axios";
import { useUserStore } from "../../Store/userStore";
import { useNavigate } from "react-router-dom";
import { useLoadingStore } from "../../Store/loadingStore";
import { useNotificationStore } from "../../Store/notification";
function SignupForm() {
  const navigate = useNavigate();
  const { setNotifications } = useNotificationStore();
  const { setUser } = useUserStore();
  const { proggressBar, setProgress } = useLoadingStore();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    username: false,
    password: false,
    email: false,
    confirmPassword: false,
  });
  function removeError(key) {
    setError({ ...error, [key]: false });
  }
  async function signUp() {
    if (
      Object.entries(newUser).some((item) => {
        if (item[1] === "" || !item[1]) {
          setError({ ...error, [item[0]]: true });
          console.log(error);

          return true;
        }
        return false;
      })
    ) {
      return;
    }
    if (newUser.password !== newUser.confirmPassword) {
      return setError({ ...error, password: "Password doesn't match!" });
    }
    if (!newUser.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
      return setError({
        ...error,
        password:
          "Password should be between 6 and 20 characters, containing at least 1 digit, 1 lowercase and 1 uppercase letters",
      });
    }
    if (!newUser.username.match(/^[A-Z](?=.*\d)[a-zA-Z0-9]{5,13}$/)) {
      return setError({
        ...error,
        username:
          "Username should be between 6 and 14 characters, starting with an uppercase letter and including at least 1 digit",
      });
    }
    if (
      !newUser.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      return setError({
        ...error,
        email: "Invalid email",
      });
    }

    try {
      setLoading(true);
      setProgress(30);
      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}user/signup`,
        newUser
      );
      if (response) {
        setProgress(80);
         (response.data);
        setUser(response.data);
        setNotifications(
          response.data.notifications?.filter((item) => item.isRead)
        );
        setLoading(false);
        navigate("/verify");
        setTimeout(() => {
          setProgress(100);
        }, 300);
      }
    } catch (error) {
      if (error.response?.data?.error === "Username already exist") {
        setError({ ...error, username: error.response.data.error });
      } else if (
        error.response?.data?.error === "a User with this email already exist"
      ) {
        setError({ ...error, email: "A user with this email already exist" });
      }
      setTimeout(() => {
        setProgress(100);
      }, 300);
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <motion.div
      layout
      initial={{ x: 500 }}
      animate={{ x: 0 }}
      exit={{ x: 500 }}
      transition={{ duration: 0.1 }}
      className={style.signupformContainer}
    >
      <div className={style.inputsContainer}>
        <div className={style.nameWrapper}>
          <Input
            value={newUser}
            removeError={removeError}
            setValue={setNewUser}
            label={"First Name"}
            control={"firstName"}
            required
            isError={error["firstName"] ? true : false}
            isDisabled={loading}
          />
          <Input
            value={newUser}
            removeError={removeError}
            setValue={setNewUser}
            label={"Last Name"}
            control={"lastName"}
            required
            isError={error["lastName"] ? true : false}
            isDisabled={loading}
          />
        </div>
        <Input
          value={newUser}
          setValue={setNewUser}
          label={"Username"}
          removeError={removeError}
          control={"username"}
          required
          isError={error["username"] ? true : false}
          isDisabled={loading}
          errorMessage={error.username?.length && error.username}
        />
        <Input
          value={newUser}
          setValue={setNewUser}
          label={"Email"}
          control={"email"}
          removeError={removeError}
          required
          isError={error["email"] || error["invalid-email"] ? true : false}
          isDisabled={loading}
          errorMessage={error.email?.length && error.email}
        />
        <Input
          value={newUser}
          setValue={setNewUser}
          label={"Password"}
          control={"password"}
          removeError={removeError}
          required
          type="password"
          isError={
            error["password"] || error["password-mismatch"] ? true : false
          }
          errorMessage={
            error["password"] || error["password-mismatch"]
              ? error.password
              : ""
          }
          isDisabled={loading}
        />
        <Input
          value={newUser}
          setValue={setNewUser}
          label={"Confirm Password"}
          control={"confirmPassword"}
          type="password"
          required
          isError={error["password-mismatch"] ? true : false}
          removeError={removeError}
          isDisabled={loading}
        />
      </div>

      <HexButton text={"Sign Up"} isDisabled={loading} onClick={signUp} />
    </motion.div>
  );
}

export default SignupForm;
