import style from "./NavBar.module.css";
import { LuSearch } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { TbBellRinging2Filled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useUserStore } from "../../Store/userStore";

function NavBar({ query, setQuery }) {
  const navigate = useNavigate();
  const { logout } = useUserStore();
  return (
    <section className={style.navBarContainer}>
      <div className={style.navBarContentContainer}>
        <div>Logo</div>
        <div className={style.searchContainer}>
          <input
            type="text"
            placeholder="Search..."
            className={style.searchInput}
          />
          <LuSearch size={20} color="#959DA5" className={style.searchIcon} />
        </div>
        <ul className={style.navItemsContainer}>
          <li className={style.headerNavItem} onClick={() => navigate("/post")}>
            <LuPlus className={style.addPostIcon} />
            <span className={style.actionLabel}>Create Post</span>
          </li>
          <li className={style.headerNavItem}>
            <TbBellRinging2Filled className={style.notificationsIcon} />
          </li>
          <li className={style.headerNavItem}>
            <LuLogOut className={style.logoutIcon} onClick={() => logout()} />
          </li>
        </ul>
      </div>
    </section>
  );
}

export default NavBar;
