import style from "./ProfileHero.module.css";
import { FaPlaystation } from "react-icons/fa6";
import { LiaXbox } from "react-icons/lia";
import { LuPcCase } from "react-icons/lu";

function ProfileHero({ user }) {
  const platformIcons = {
    PS: <FaPlaystation className={`${style.platformIcon} ${style.PSIcon}`} />,
    Xbox: <LiaXbox className={`${style.platformIcon} ${style.XboxIcon}`} />,
    PC: <LuPcCase className={`${style.platformIcon} ${style.PCIcon}`} />,
  };
  const platformDialogs = {
    PS: "PSDialog",
    Xbox: "XboxDialog",
    PC: "PCDialog",
  };

  return (
    <div className={style.profilePage}>
      <div className={style.heroSection}>
        {/* <img src="" alt="" /> */}
        <div className={style.blurredLayer}></div>
        <div className={style.userHeroSection}>
          <div className={style.userInfoWrapper}>
            <figure className={style.imageWrapper}>
              <img
                src={`${import.meta.env.VITE_ENDPOINT}${user.avatar}`}
                alt=""
                className={style.userAvatar}
              />
            </figure>
            <div className={style.userNameAndPlatforms}>
              <span className={style.userName}>{user.username}</span>
              <span className={style.platformIconsContainer}>
                {user.platforms?.map((item, idx) => (
                  <div className={style.singleIconContainer} key={idx}>
                    {platformIcons[item.name]}
                    <div
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
                    </div>
                  </div>
                ))}
              </span>
            </div>
          </div>
        </div>
        <div className={style.userActivityContainer}>
          <div className={style.userActivityWrapper}>
            <div className={style.singleDetail}>
              <span>{user.posts.length}</span>
              <span>Posts Made</span>
            </div>
            <div className={style.singleDetail}>
              <span>{user.friends.length}</span>
              <span>Teammates</span>
            </div>
            <div className={style.singleDetail}>
              <span>{user.games.length}</span>
              <span>Games</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHero;
