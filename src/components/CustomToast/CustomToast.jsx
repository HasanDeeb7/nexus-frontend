import style from "./CustomToast.module.css";
import { MdOutlineOpenInNew } from "react-icons/md";
function CustomToast({ message, onClick }) {
  return (
    <div className={style.customToastContainer}>
      {message}{" "}
      <span>
        <MdOutlineOpenInNew onClick={onClick} className={style.customToast} />
      </span>
    </div>
  );
}

export default CustomToast;
