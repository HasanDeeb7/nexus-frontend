import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import style from "./HeroSection.module.css";
import ac from "/images/silhouettes/ac.png";
import kratos from "/images/silhouettes/godofwar.png";
import nate from "/images/silhouettes/uncharted.png";
import geralt from "/images/silhouettes/thewitcher.png";
import video from "/videos/bgVideo.mp4";
import { useLoadingStore } from "../../Store/loadingStore";

const HeroSection = () => {

  return (
    <div className={style.HeroSection}>
      <video autoPlay loop muted className={style.bgVideo}>
        <source src={video} />
      </video>
      <div className={style.HeroImgContainer}>
        <img src={ac} className={style.image} />
        <img src={kratos} className={style.image} />
        <img src={geralt} className={style.image} />
        <img src={nate} className={style.image} />
      </div>

      <div className={style.heroSlogan}>
        <h1 className={`${style.heading} ${style.neonText}`}>
          Never Game Alone
        </h1>
        <p className={style.subheading}>
          Share your passion, connect with fellow gamers, and level up your
          experiences.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
