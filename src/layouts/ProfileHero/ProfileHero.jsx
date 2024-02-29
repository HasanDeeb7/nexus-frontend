import { useEffect, useRef, useState } from "react";
import style from "./ProfileHero.module.css";
import { FaPlaystation } from "react-icons/fa6";
import { LiaXbox } from "react-icons/lia";
import { LuPcCase } from "react-icons/lu";
import { AnimatePresence, animate, motion } from "framer-motion";
import { useUserStore } from "../../Store/userStore";
import bgPattern from "/public/videos/bgPattern.mp4";
function ProfileHero({ userProfile, addFriend }) {
  const [activeDialog, setActiveDialog] = useState(false);
  const dialogRef = useRef([]);
  const pushRef = (el) => dialogRef.current.push(el);
  const { user } = useUserStore();

  const platformIcons = {
    PS: (
      <FaPlaystation
        className={`${style.platformIcon} ${style.PSIcon}`}
        ref={pushRef}
      />
    ),
    Xbox: (
      <LiaXbox
        className={`${style.platformIcon} ${style.XboxIcon}`}
        ref={pushRef}
      />
    ),
    PC: (
      <LuPcCase
        className={`${style.platformIcon} ${style.PCIcon}`}
        ref={pushRef}
      />
    ),
  };
  const platformDialogs = {
    PS: "PSDialog",
    Xbox: "XboxDialog",
    PC: "PCDialog",
  };

  function handleDialog(e) {
    if (!dialogRef.current.some((ref) => ref && ref.contains(e.target))) {
      setActiveDialog(null); // Close dialog if clicked outside
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleDialog);
    return () => {
      document.removeEventListener("click", handleDialog);
    };
  }, []);
  useEffect(() => console.log("first"), [user]);

  return (
    <div className={style.heroSection}>
      <div className={style.bgVideo}>
        <video autoPlay loop muted>
          <source src={bgPattern} />
        </video>
      </div>
      {/* <img src="" alt="" /> */}
      <div className={style.blurredLayer}></div>
      <div className={style.userHeroSection}>
        <div className={style.userInfoWrapper}>
          <figure className={style.imageWrapper}>
            <img
              src={`${import.meta.env.VITE_ENDPOINT}${userProfile.avatar}`}
              alt=""
              className={style.userAvatar}
            />
            {user._id != userProfile._id ? (
              user.friends?.some((item) => item._id === userProfile._id) ? (
                <button className={style.removeFriend}>Leave</button>
              ) : (
                <button className={style.addFriendBtn} onClick={addFriend}>
                  Join
                </button>
              )
            ) : (
              ""
            )}
          </figure>
          <div className={style.userNameAndPlatforms}>
            <span className={style.userName}>{userProfile.username}</span>
            <span className={style.platformIconsContainer}>
              {userProfile.platforms?.map((item, idx) => (
                <div
                  className={style.singleIconContainer}
                  key={idx}
                  ref={pushRef}
                  onClick={() => setActiveDialog(item.name)}
                >
                  {platformIcons[item.name]}
                  <AnimatePresence mode="wait">
                    {activeDialog === item.name && (
                      <>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`${style.platformDialog} ${
                            style[platformDialogs[item.name]]
                          }`}
                        >
                          <span className={style.dialogIcon}>
                            {platformIcons[item.name]}
                          </span>
                          <span className={style.dialogUsername}>
                            {item.username}
                          </span>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </span>
          </div>
        </div>
      </div>
      <div className={style.userActivityContainer}>
        <div className={style.userActivityWrapper}>
          <div className={style.singleDetail}>
            <span>{userProfile.posts.length}</span>
            <span>Posts Made</span>
          </div>
          <div className={style.singleDetail}>
            <span>{userProfile.friends.length}</span>
            <span>Teammates</span>
          </div>
          <div className={style.singleDetail}>
            <span>{userProfile.games.length}</span>
            <span>Games</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHero;
