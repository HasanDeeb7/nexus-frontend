import { useEffect, useRef, useState } from "react";
import style from "./Select.module.css";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function Select({ value, getOptions }) {
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <section
      className={style.selectContainer}
      onClick={() => setIsOpen(!isOpen)}
      ref={dropDownRef}
    >
      {value.name || value}
      {isOpen && (
        <section className={style.optionsContainer}>{getOptions()}</section>
      )}
    </section>
  );
}

export default Select;
