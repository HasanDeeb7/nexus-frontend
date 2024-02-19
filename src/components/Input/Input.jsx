import { useState } from "react";
import style from "./Input.module.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Input({
  value,
  setValue,
  label,
  control,
  isDisabled = false,
  type = "text",
  tag = "input",
  required = false,
  isError,
  removeError,
  className,
  container,
  errorMessage = "",
  onChange = null,
}) {
  const [isShown, setIsShown] = useState(false);
  function handleChange(e) {
    isError && removeError(control);
    setValue({ ...value, [e.target.name]: e.target.value });
  }
  function togglePassword() {
    if (type === "password") {
      setIsShown(!isShown);
      type = "text";
    }
  }

  return (
    <div className={`${style.inputWrapper} ${container && container}`}>
      {tag === "input" ? (
        <>
          <form className={style.inputForm} autoComplete="off">
            <label className={style.loginInputLable}>{label}</label>
            <input
              className={`${style.loginInput} ${className} ${
                isDisabled && style.disabledInput
              } ${isError && style.errorInput}`}
              type={isShown ? "text" : type}
              name={control}
              id={control}
              value={value[control]}
              onChange={onChange ? onChange : handleChange}
              disabled={isDisabled}
              placeholder={`Enter Your ${label}`}
            />
            {required && <div className={style.requiredInput}></div>}
            {type === "password" &&
              (isShown ? (
                <FaRegEyeSlash
                  className={style.eyeIcon}
                  onClick={togglePassword}
                />
              ) : (
                <FaRegEye className={style.eyeIcon} onClick={togglePassword} />
              ))}
            {isError && errorMessage && (
              <span className={style.errorLabel}>{errorMessage}</span>
            )}
          </form>
        </>
      ) : (
        <>
          <textarea
            className={`${style.textarea}`}
            type={type}
            name={control}
            id={control}
            value={value[control]}
            onChange={handleChange}
            disabled={isDisabled}
            style={{ resize: "none", width: "100%", height: "100px" }}
          />
          <label
            className={`${style.textareaLabel} ${
              value[control] && style.textareActive
            }`}
          >
            {label}
          </label>
        </>
      )}
    </div>
  );
}

export default Input;
