import style from "./Loading.module.css";
import { LiaPlaystation } from "react-icons/lia";
import { FaPlaystation } from "react-icons/fa6";
import { LiaXbox } from "react-icons/lia";
import { LuPcCase } from "react-icons/lu";
function Loading() {
  return (
    <div className={style.loadingIcons}>
      <FaPlaystation className={`${style.psIcon} ${style.platformIcon}`} />
      <LiaXbox className={`${style.xboxIcon} ${style.platformIcon}`} />
      <LuPcCase className={`${style.pcIcon} ${style.platformIcon}`} />
    </div>
  );
}

export default Loading;
