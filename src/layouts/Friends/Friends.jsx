import { LuPcCase } from "react-icons/lu";
import style from "./Friends.module.css";
import { LiaXbox } from "react-icons/lia";
import { FaPlaystation } from "react-icons/fa6";
import Avvvatars from "avvvatars-react";
import { useUserStore } from "../../Store/userStore";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Friends({ title, user: userProfile }) {
  const btnsRef = useRef([]);
  const pushRef = (el) => btnsRef.current.push(el);
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const [friends, setFriends] = useState(userProfile.friends);
  const platformIcons = {
    PS: <FaPlaystation className={`${style.platformIcon} ${style.PSIcon}`} />,
    Xbox: <LiaXbox className={`${style.platformIcon} ${style.XboxIcon}`} />,
    PC: <LuPcCase className={`${style.platformIcon} ${style.PCIcon}`} />,
  };
  async function removeFriend(username, item) {
    if (user.friends.some((friend) => friend.username === username)) {
      setUser({
        ...user,
        friends: user.friends.filter((friend) => friend.username !== username),
      });
    } else {
      setUser({ ...user, friends: [...user.friends, { username: username }] });
    }
    user.friends.filter((friend) => friend.username !== username);
    if (username) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_ENDPOINT}user/add-friend`,
          { username: username }
        );
        if (res) {
          //   setUserProfile(res.data.targetUser);
          res.data.user.friends;
          setUser({ ...user, friends: res.data?.user?.friends });
          // setFriends([...friends]);
          user;
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
    friends;
    userProfile;
    setFriends(userProfile.friends || []);
  }, [userProfile, friends]);
  return (
    <>
      {title && <h2 className={style.title}>{title}</h2>}
      <div className={style.friendsSection}>
        {friends.map((item, idx) => {
          if (item.username !== user.username) {
            return (
              <div
                onClick={(e) => {
                  if (
                    btnsRef.current.some((ref) => ref && ref.contains(e.target))
                  ) {
                    return;
                  } else {
                    navigate(`/profile/${item.username}`);
                  }
                }}
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
                  {item.platforms?.map((item, idx) => (
                    <div className={style.singlePlatform} key={idx}>
                      <div className={style.platIcon}>
                        {platformIcons[item.name]}
                      </div>
                      <div className={style.platUsername}>{item.username}</div>
                    </div>
                  ))}
                </div>
                {user.friends.some(
                  (friend) => friend.username === item.username
                ) ? (
                  <button
                    ref={pushRef}
                    className={style.removeFriendBtn}
                    onClick={() => removeFriend(item.username)}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    ref={pushRef}
                    className={style.addFriendBtn}
                    onClick={() => removeFriend(item.username)}
                  >
                    Add
                  </button>
                )}
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default Friends;
