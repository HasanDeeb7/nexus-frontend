import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import style from "./HeroSection.module.css";

import im4 from "/images/im4.png";
import im5 from "/images/Kratos.png";
import im6 from "/images/im6.png";
import im7 from "/images/im7.png";
import video from "/videos/bgVideo.mp4";
// import pattern from "/images/patter3.jpg";
const images = [im4, im5, im6, im7];

const HeroSection = () => {
  // Adjust interval for desired animation speed

  return (
    <div className={style.HeroSection}>
      <video autoPlay loop muted className={style.bgVideo}>
        <source src={video} />
      </video>
      <div className={style.HeroImgContainer}>
        <img src={im4} className={style.image1} />
        <img src={im5} className={style.image} />
      </div>

      <div className={style.heroSlogan}>
        <h1 className={style.heading}>Never Game Alone</h1>
        <p className={style.subheading}>
          Share your passion, connect with fellow gamers, and level up your
          experiences.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
