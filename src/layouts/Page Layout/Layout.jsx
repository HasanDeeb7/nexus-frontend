import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import style from "./Layout.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { useLoadingStore } from "../../Store/loadingStore";
import video from "/public/videos/bgVideo.mp4";
import pattern from "/public/images/pattern1.jpg";
import pattern2 from "/public/images/pattern2.jpg";
import pattern3 from "/public/images/pattern3.jpg";

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
        <img src={pattern3} alt="" />
      </div>
      <NavBar />
      <section className={style.pageWrapper}>
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
        >
          dfaksdfj
        </div>
      </section>
    </div>
  );
}

export default Layout;