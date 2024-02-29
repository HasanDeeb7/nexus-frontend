import { NavLink } from "react-router-dom";
import style from "./SideBar.module.css";
import { TiHome } from "react-icons/ti";
import { TiCompass } from "react-icons/ti";
import { IoChatbubblesOutline } from "react-icons/io5";
import { TiBell } from "react-icons/ti";
import { useUserStore } from "../../Store/userStore";
import Avvvatars from "avvvatars-react";
function SideBar() {
  const { user } = useUserStore();
  return (
    <>
      <div className={style.sideBarContainer}>
        
      </div>
    </>
  );
}

export default SideBar;
