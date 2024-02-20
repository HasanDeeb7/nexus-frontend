import Input from "../Input/Input";
import style from "./NavBar.module.css";
import { LuSearch } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { TbBellRinging2Filled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function NavBar({ query, setQuery }) {
  const navigate = useNavigate();
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
            Create Post
          </li>
          <li className={style.headerNavItem}>
            <TbBellRinging2Filled className={style.notificationsIcon} />
          </li>
          {/* <li className={style.headerNavItems}></li> */}
        </ul>
      </div>
    </section>
  );
}

export default NavBar;
