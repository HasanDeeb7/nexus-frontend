import style from "./NavBar.module.css";
import { LuSearch } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { TbBellRinging2Filled } from "react-icons/tb";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useUserStore } from "../../Store/userStore";
import Avvvatars from "avvvatars-react";
import { TiBell, TiCompass, TiHome } from "react-icons/ti";
import { IoChatbubblesOutline } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import { result } from "lodash";
import { useLoadingStore } from "../../Store/loadingStore";
import { AnimatePresence, motion } from "framer-motion";

function NavBar({ outlet = false }) {
  const navigate = useNavigate();
  const { logout } = useUserStore();
  const { user } = useUserStore();
  const { setLoadingWall } = useLoadingStore();
  const [isNavOpen, setIsnavOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!outlet) {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  async function search() {
    console.log(query);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}search`,
        { params: { query: query } }
      );
      if (response) {
        console.log(response.data);
        navigate("/search", { state: { data: response.data } });
      }
    } catch (error) {
      console.log(response);
    }
  }

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // 👇️ call submit function here
      search();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [query]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.section
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ ease: "easeIn", duration: 0.2 }}
            className={style.navBarContainer}
            key={"navbar"}
          >
            <div>Logo</div>

            <div
              className={`${style.burgerMenu} ${isNavOpen && style.burgerOpen}`}
              onClick={() => setIsnavOpen(!isNavOpen)}
            >
              <LuMenu />
            </div>

            <div
              className={`${style.navBarContentContainer} ${
                isNavOpen && style.navBarOpen
              }`}
            >
              <ul className={style.navItemsContainer}>
                <li className={style.navItemWrapper}>
                  <NavLink
                    to={"/home"}
                    onClick={() => setLoadingWall(true)}
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
                    onClick={() => setLoadingWall(true)}
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

                <li className={style.navItemWrapper}></li>
              </ul>
              <div className={style.searchContainer}>
                <input
                  type="text"
                  placeholder="Search..."
                  className={style.searchInput}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
                <LuSearch
                  size={20}
                  color="#959DA5"
                  className={style.searchIcon}
                />
              </div>
              <ul className={style.navItemsContainer}>
                <li
                  className={style.headerNavItem}
                  onClick={() => navigate("/post")}
                >
                  <LuPlus className={style.addPostIcon} />
                  <span className={style.actionLabel}>Create Post</span>
                </li>
                <li className={style.headerNavItem}>
                  <TbBellRinging2Filled className={style.notificationsIcon} />
                </li>
                <li className={style.profileHeadNav}>
                  <NavLink
                    to={"/myProfile"}
                    replace
                    // className={({ isActive }) =>
                    //   isActive ? style.activeLink : style.navItem
                    // }
                  >
                    {user.avatar ? (
                      <img
                        src={`${import.meta.env.VITE_ENDPOINT}${user.avatar}`}
                        className={style.userImage}
                      />
                    ) : (
                      <Avvvatars value={user.username} size={34} />
                    )}
                  </NavLink>
                </li>
                <li className={style.headerNavItem}>
                  <LuLogOut
                    className={style.logoutIcon}
                    onClick={() => logout()}
                  />
                </li>
              </ul>
            </div>
          </motion.section>
          {outlet && <Outlet />}
        </>
      )}
    </AnimatePresence>
  );
}

export default NavBar;
