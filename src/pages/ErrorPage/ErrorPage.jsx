import style from "./ErrorPage.module.css";
import errorIcon from "../../assets/brokenController.svg";
function ErrorPage({ code = "", text }) {
  return (
    <div className={style.errorPageContainer}>
      <h1>{code}</h1>
      <img src={errorIcon} alt="brokenController" />
      <p>{text}</p>
    </div>
  );
}

export default ErrorPage;
