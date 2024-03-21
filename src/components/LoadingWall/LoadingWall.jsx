import { useEffect } from "react";
import style from "./LoadingWall.module.css";
import { motion } from "framer-motion";
import { useLoadingStore } from "../../Store/loadingStore";

import brokenController from "../../assets/brokenController.svg";
import Loading from "../Loading/Loading";
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
      <Loading />
    </motion.div>
  );
}

export default LoadingWall;
