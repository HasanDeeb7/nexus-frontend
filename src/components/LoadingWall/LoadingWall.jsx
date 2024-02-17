import { useEffect } from "react";
import style from "./LoadingWall.module.css";
import { motion } from "framer-motion";
import { useLoadingStore } from "../../Store/loadingStore";
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
      LoadingWall
    </motion.div>
  );
}

export default LoadingWall;
