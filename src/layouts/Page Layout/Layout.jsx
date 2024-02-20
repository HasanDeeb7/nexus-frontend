import React, { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import style from "./Layout.module.css";
import NavBar from "../../components/NavBar/NavBar";
function Layout() {
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
