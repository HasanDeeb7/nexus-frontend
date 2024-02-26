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
        <ul className={style.navItemsContainer}>
          <li className={style.navItemWrapper}>
            <NavLink
              to={"/home"}
              className={({ isActive }) =>
                isActive ? style.activeLink : style.navItem
              }
            >
              <TiHome className={style.navIcon} />
              <span className={style.linkLabel}>Home</span>
            </NavLink>
          </li>
          <li className={style.navItemWrapper}>
            <NavLink
              to={"/explore"}
              className={({ isActive }) =>
                isActive ? style.activeLink : style.navItem
              }
            >
              {/* <TiHome className={style.navIcon} /> */}
              <TiCompass className={style.navIcon} />

              <span className={style.linkLabel}>Explore</span>
            </NavLink>
          </li>
          <li className={style.navItemWrapper}>
            <NavLink
              to={"/chat"}
              className={({ isActive }) =>
                isActive ? style.activeLink : style.navItem
              }
            >
              <IoChatbubblesOutline className={style.navIcon} />
              <span className={style.linkLabel}>Chat</span>
            </NavLink>
          </li>
          <li className={style.navItemWrapper}>
            <NavLink
              to={"/notification"}
              className={({ isActive }) =>
                isActive ? style.activeLink : style.navItem
              }
            >
              <TiBell className={style.navIcon} />
              <span className={style.linkLabel}>Notification</span>
            </NavLink>
          </li>
          <li className={style.navItemWrapper}>
            <NavLink
              to={"/myProfile"}
              className={({ isActive }) =>
                isActive ? style.activeLink : style.navItem
              }
            >
              {user.avatar ? (
                <img
                  src={`${import.meta.env.VITE_ENDPOINT}${user.avatar}`}
                  className={style.userImage}
                />
              ) : (
                <Avvvatars value={user.username} size={34} />
              )}
              <span className={style.linkLabel}>Profile</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
