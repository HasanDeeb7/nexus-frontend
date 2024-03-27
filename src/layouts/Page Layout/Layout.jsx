import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import style from "./Layout.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { useLoadingStore } from "../../Store/loadingStore";
import PublicChat from "../PublicChat/PublicChat";

function Layout() {
  const { setLoadingWall } = useLoadingStore();
  useEffect(() => {
    setTimeout(() => {
      setLoadingWall(false);
    }, 1000);
  }, []);
  const [query, setQuery] = useState({ search: "" });
  return (
    <div className={style.layout}>
      {/* <div className={style.pageBackground}>
        <video autoPlay muted loop id="video">
          <source src={video} />
        </video>
      </div> */}
  
      <div className={style.pageBackground}>
        {/* <img src={pattern3} alt="" /> */}
      </div>
      <NavBar />
      <section className={style.pageWrapper}>
        <div className={style.pageContent}>
          <Outlet />
        </div>
        <PublicChat />
      </section>
    </div>
  );
}

export default Layout;
