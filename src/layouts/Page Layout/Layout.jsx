import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import style from "./Layout.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { useLoadingStore } from "../../Store/loadingStore";
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
      <NavBar query={query} setQuery={setQuery} />
      <section className={style.pageWrapper}>
        <SideBar />
        <div className={style.pageContent}>
          <Outlet />
        </div>
        <div
          style={{
            width: "20%",
            height: "100vh",
            position: "sticky",
            backgroundColor: "black",
            right: 0,
            top: 0,
          }}
        >dfaksdfj</div>
      </section>
    </div>
  );
}

export default Layout;
