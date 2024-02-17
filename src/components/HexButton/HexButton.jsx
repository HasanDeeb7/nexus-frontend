import style from "./HexButton.module.css";

function HexButton({ isDisabled, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${style.button} ${style.border} ${
        isDisabled && style.disabledBtn
      }`}
      disabled={isDisabled}
    >
      <span className={style.buttonText}>{text}</span>
    </button>
  );
}

export default HexButton;
