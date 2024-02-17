import style from "./Registration.module.css";
import LoginForm from "../../layouts/LoginForm/LoginForm";
import map from "/images/map.jpg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import SignupForm from "../../layouts/SignupForm/SignupForm";
import { AnimatePresence } from "framer-motion";
function Registration() {
  const [activeForm, setActiveForm] = useState("login");
  return (
    <>
      <img src={map} alt="" className={style.image} />
      <div className={style.registrationContainer}>
        <div className={style.registrationModal}>
          {/* <div className={style.imageContainer}>
          <img src={Assassin} alt="Assassin image" className={style.loginImg} />
        </div> */}
          <div className={style.formContainer}>
            <nav className={style.formNav}>
              <NavLink
                onClick={() => {
                  setActiveForm("login");
                }}
                className={`${style.navButtons} ${
                  activeForm === "login" && style.activeNav
                } ${style.loginNav}`}
              >
                Sign In
              </NavLink>
              <NavLink
                onClick={() => {
                  setActiveForm("signup");
                }}
                className={`${style.navButtons} ${
                  activeForm === "signup" && style.activeNav
                }`}
              >
                Sign Up
              </NavLink>
            </nav>
            <AnimatePresence mode="wait">
              {activeForm === "login" ? (
                <LoginForm key={"login"} />
              ) : (
                <SignupForm key={"signup"} />
              )}
            </AnimatePresence>
            <footer className={style.formFooter}>
              <p className={style.disclaimer}>
                By logging in, you confirm that you are above 18 years old and
                agree to abide by our{" "}
                <a href="https://www.termsandconditionsgenerator.com/live.php?token=s5OuiqJgefz453gBn97hbxehj7W841ju">
                  terms and conditions
                </a>
                . Please read them carefully before proceeding. Access to our
                platform is granted solely upon acceptance of these terms.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
