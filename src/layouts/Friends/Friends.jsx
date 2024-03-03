import { LuPcCase } from "react-icons/lu";
import style from "./Friends.module.css";
import { LiaXbox } from "react-icons/lia";
import { FaPlaystation } from "react-icons/fa6";
import Avvvatars from "avvvatars-react";
import { useUserStore } from "../../Store/userStore";
import axios from "axios";
import { useEffect, useState } from "react";

function Friends({ title, user: userProfile }) {
  const { user, setUser } = useUserStore();
  const [friends, setFriends] = useState(userProfile.friends);
  const platformIcons = {
    PS: <FaPlaystation className={`${style.platformIcon} ${style.PSIcon}`} />,
    Xbox: <LiaXbox className={`${style.platformIcon} ${style.XboxIcon}`} />,
    PC: <LuPcCase className={`${style.platformIcon} ${style.PCIcon}`} />,
  };
  async function removeFriend(username) {
    if (username) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_ENDPOINT}user/add-friend`,
          { username: username }
        );
        if (res) {
          //   setUserProfile(res.data.targetUser);
          console.log(res.data.user.friends);
          setUser({ ...user, friends: res.data?.user?.friends });
          setFriends(res.data?.user?.friends);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("effect");
  }, [friends]);
  return (
    <>
      {title && <h2 className={style.title}>{title}</h2>}
      <div className={style.friendsSection}>
        {friends.map((item, idx) => (
          <div
            className={style.friend}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${
                import.meta.env.VITE_ENDPOINT
              }${item.avatar})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            key={idx}
          >
            <div className={style.imageUserWrapper}>
              {item.avatar ? (
                <img
                  src={`${import.meta.env.VITE_ENDPOINT}${item.avatar}`}
                  className={style.userAvatar}
                  alt=""
                />
              ) : (
                <Avvvatars value={item.username} size={40} />
              )}
              <p className={style.friendUsername}>{item.username}</p>
            </div>
            <div className={style.platforms}>
              {item.platforms.map((item, idx) => (
                <div className={style.singlePlatform}>
                  <div className={style.platIcon}>
                    {platformIcons[item.name]}
                  </div>
                  <div className={style.platUsername}>{item.username}</div>
                </div>
              ))}
            </div>
            {user.username === userProfile.username && (
              <button
                className={style.removeFriendBtn}
                onClick={() => removeFriend(item.username)}
              >
                Leave
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Friends;
