import React, { useEffect, useRef } from "react";
import style from "./ConfirmModal.module.css";
import { motion } from "framer-motion";

function ConfirmModal({ closeHandler, action, message }) {
  const ref = useRef();

  useEffect(() => {
    const clickListener = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        closeHandler();
      }
    };

    setTimeout(() => {
      document.addEventListener("click", clickListener);
    }, 100);

    return () => document.removeEventListener("click", clickListener);
  }, []); //
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className={style.actionModalContainer}
    >
      <div className={style.contentContainer} ref={ref}>
        <p>{message}</p>
        <div className={style.btnsContainer}>
          <button className={style.cancelBtn} onClick={closeHandler}>
            Cancel
          </button>
          <button
            onClick={() => {
              action();
            }}
            className={style.confirmBtn}
          >
            Confirm
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ConfirmModal;
