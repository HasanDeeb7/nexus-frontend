import { useState } from "react";
import { useUserStore } from "../../Store/userStore";
import style from "./VerifyAccount.module.css";
import map from "/images/map.jpg";
import axios from "axios";
import VerificationInput from "react-verification-input";
import { useNavigate } from "react-router-dom";
import { useLoadingStore } from "../../Store/loadingStore";

function VerifyAccount() {
  const { user, setUser } = useUserStore();
  const { setProgress } = useLoadingStore();
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerivicationCode] = useState("");
  const [filled, setFilled] = useState(verificationCode.length >= 6);
  const navigate = useNavigate();
  function handleCodeChange(string) {
    setVerivicationCode(string);
  }
  async function sendCode() {
    setLoading(true);
    setProgress(30);
    try {
      const response = await axios.get(`${import.meta.env.VITE_ENDPOINT}code/`);
      setProgress(50);

      if (response) {
        console.log(response);
        setLoading(false);
        setCodeSent(true);
        setProgress(100);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function verifyCode() {
    try {
      setProgress(50);
      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}code/verify`,
        { code: verificationCode }
      );
      if (response) {
        console.log(response.data);
        setUser({ ...user, isVerified: true });
        setProgress(100);
        navigate("/avatar");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      {" "}
      <img src={map} alt="" className={style.image} />
      <div className={style.uploadFormContainer}>
        <div className={style.modal}>
          <div className={style.contentWrapper}>
            {!codeSent ? (
              <>
                <section className={style.modalHeader}>
                  <h1>Verify your account</h1>
                  <p>
                    We will send a verification code to{" "}
                    <span className={style.boldEmail}>{user.email}</span>
                  </p>
                </section>
                <section className={style.actions}>
                  <button
                    type="button"
                    className={style.primaryBtn}
                    onClick={sendCode}
                    disabled={loading}
                  >
                    Send Code
                  </button>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2>Check Your Inbox</h2>
                </section>
                <p>
                  We have sent the code to
                  <span className={style.boldEmail}>
                    {user.email}. Check your inbox and submit the received code
                  </span>
                  .
                </p>
                <section className={style.inputsContainer}>
                  <VerificationInput
                    length={6}
                    value={verificationCode}
                    onChange={(string) => handleCodeChange(string)}
                    validChars="0-9"
                    placeholder="_"
                    onComplete={() => setFilled(true)}
                    autoFocus
                    inputProps={{ inputMode: "numeric" }}
                    classNames={{
                      container: style.verificationContainer,
                      character: style.verificationCharacter,
                      characterInactive: style.inactiveCharacter,
                      characterSelected: style.selectedCharacter,
                      characterFilled: style.filledCharacter,
                    }}
                  />
                  <button
                    className={`${style.primaryBtn} ${
                      (!filled || loading) && style.disabledBtn
                    }`}
                    type="button"
                    disabled={!filled || loading}
                    onClick={verifyCode}
                  >
                    Verify
                  </button>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;
