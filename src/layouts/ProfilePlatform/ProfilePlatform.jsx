import { useEffect, useState } from "react";
import style from "./ProfilePlatform.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import { LuPlus } from "react-icons/lu";
import axios from "axios";
import { useUserStore } from "../../Store/userStore";

function ProfilePlatform() {
  const { setUser, user } = useUserStore();
  const [platforms, setPlatforms] = useState({
    PS: "",
    Xbox: "",
    PC: "",
  });
  const [controller, setController] = useState();
  function handleChange(e) {
    setPlatforms({ ...platforms, [e.target.name]: e.target.value });
  }
  async function addPlatform(platformName, username) {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_ENDPOINT}user/add-platform`,
        { platformName: platformName, username: username }
      );
      if (response) {
         (response.data);
        setUser({ ...user, platforms: response.data.platforms });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={style.profilePlatform}>
      <h2>Add Platform</h2>
      <div className={style.platformsContainer}>
        <div className={style.platformController}>
          <div className={`${style.platform} ${style.PSPlatform}`}>
            Playstation Network
            <div
              className={style.platformOpener}
              onClick={() =>
                controller !== "PS" ? setController("PS") : setController(false)
              }
            >
              <IoIosArrowDown
                className={`${style.arrowIcon} ${
                  controller === "PS" && style.reversedArrow
                }`}
              />
            </div>
          </div>
          <input
            placeholder="Username..."
            name="PS"
            value={platforms["PS"]}
            onChange={handleChange}
            className={`${style.profileUsername} ${style.PSProfileUsername} ${
              controller === "PS" && style.openInput
            }`}
          />
          <button
            className={`${style.addPlatformBtn} ${
              controller === "PS" && style.openedBtn
            }`}
            onClick={() => addPlatform("PS", platforms.PS)}
          >
            <LuPlus className={style.addIcon} />
          </button>
        </div>
        <div className={style.platformController}>
          <div className={`${style.platform} ${style.PCPlatform}`}>
            Steam Or Origin
            <div
              className={style.platformOpener}
              onClick={() =>
                controller !== "PC" ? setController("PC") : setController(false)
              }
            >
              <IoIosArrowDown
                className={`${style.arrowIcon} ${
                  controller === "PC" && style.reversedArrow
                }`}
              />
            </div>
          </div>
          <input
            placeholder="Username..."
            name="PC"
            value={platforms["PC"]}
            onChange={handleChange}
            className={`${style.profileUsername} ${style.PCProfileUsername} ${
              controller === "PC" && style.openInput
            }`}
          />
          <button
            className={`${style.addPlatformBtn} ${
              controller === "PC" && style.openedBtn
            }`}
            onClick={() => addPlatform("PC", platforms.PC)}
          >
            <LuPlus className={style.addIcon} />
          </button>
        </div>
        <div className={style.platformController}>
          <div className={`${style.platform} ${style.XboxPlatform}`}>
            Xbox Live
            <div
              className={style.platformOpener}
              onClick={() =>
                controller !== "Xbox"
                  ? setController("Xbox")
                  : setController(false)
              }
            >
              <IoIosArrowDown
                className={`${style.arrowIcon} ${
                  controller === "Xbox" && style.reversedArrow
                }`}
              />
            </div>
          </div>
          <input
            placeholder="Username..."
            name="Xbox"
            value={platforms[`Xbox`]}
            onChange={handleChange}
            className={`${style.profileUsername} ${style.XboxProfileUsername} ${
              controller === "Xbox" && style.openInput
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePlatform;
