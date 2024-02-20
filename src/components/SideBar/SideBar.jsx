import { NavLink } from "react-router-dom";
import style from "./SideBar.module.css";
import { TiHome } from "react-icons/ti";
import { TiCompass } from "react-icons/ti";
import { IoChatbubblesOutline } from "react-icons/io5";
import { TiBell } from "react-icons/ti";
import { useUserStore } from "../../Store/userStore";
function SideBar() {
  const { user } = useUserStore();
  return (
    <section>
      <div className={style.sideBarContainer}>
        <ul className={style.navItemsContainer}>
          <li className={style.navItemWrapper}>
            <NavLink
              to={"/fypage"}
              className={({ isActive }) =>
                isActive ? style.activeLink : style.navItem
              }
            >
              <TiHome className={style.navIcon} />
              <span>Home</span>
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

              <span>Explore</span>
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
              <span>Chat</span>
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
              <span>Notification</span>
            </NavLink>
          </li>
          <li className={style.navItemWrapper}>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? style.activeLink : style.navItem
              }
            >
              <img
                src={`${import.meta.env.VITE_ENDPOINT}${user.avatar}`}
                className={style.userImage}
              />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={style.ouletContainer}></div>
    </section>
  );
}

export default SideBar;
