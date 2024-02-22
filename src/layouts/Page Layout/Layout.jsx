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
    <>
      <NavBar query={query} setQuery={setQuery} />
      <SideBar />
      <div className={style.pageContent}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
