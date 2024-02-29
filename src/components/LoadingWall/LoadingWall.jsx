import { useEffect } from "react";
import style from "./LoadingWall.module.css";
import { motion } from "framer-motion";
import { useLoadingStore } from "../../Store/loadingStore";
import { LiaPlaystation } from "react-icons/lia";
import { FaPlaystation } from "react-icons/fa6";
import { LiaXbox } from "react-icons/lia";
import { LuPcCase } from "react-icons/lu";
import brokenController from "../../assets/brokenController.svg";
function LoadingWall() {
  const { setLoadingWall } = useLoadingStore();
  //   useEffect(() => {
  //     setTimeout(() => {
  //       setLoadingWall(false);
  //     }, 1000);
  //   });
  return (
    <motion.div
      initial={{ y: -800 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      exit={{ y: -800 }}
      className={style.loadingWallContainer}
    >
      <div className={style.loadingIcons}>
        <FaPlaystation className={`${style.psIcon} ${style.platformIcon}`} />
        <LiaXbox className={`${style.xboxIcon} ${style.platformIcon}`} />
        <LuPcCase className={`${style.pcIcon} ${style.platformIcon}`} />
      </div>
    </motion.div>
  );
}

export default LoadingWall;
