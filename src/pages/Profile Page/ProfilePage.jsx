import { useLocation, useNavigate, useParams } from "react-router-dom";
import style from "./ProfilePage.module.css";
import { useUserStore } from "../../Store/userStore";

import ProfileHero from "../../layouts/ProfileHero/ProfileHero";
import axios from "axios";
import PostsLayout from "../../layouts/PostsLayout/PostsLayout";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProfilePlatform from "../../layouts/ProfilePlatform/ProfilePlatform";
import { socket } from "../../App";
import UserGames from "../../layouts/UserGames/UserGames";
import Friends from "../../layouts/Friends/Friends";

export function Redirect({ to }) {
  const navigate = useNavigate();
}

function ProfilePage() {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { username } = useParams();
  const [section, setSection] = useState("posts");
  const [userProfile, setUserProfile] = useState(username ? username : user);
  function handleSwitchTab(tab) {
    setSection(tab);
  }
  async function getUser() {
    if (username) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_ENDPOINT}user/by-username`,
          { params: { username: username } }
        );
        if (res) {
          setUserProfile(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      setUserProfile(user);
    }
  }

  async function addFriend() {
    if (username) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_ENDPOINT}user/add-friend`,
          { username: username }
        );
        if (res) {
          setUserProfile(res.data.targetUser);
          setUser({ ...user, friends: res.data?.user?.friends });
          if (res.data.action === "add") {
            socket.emit("friend-add", { user: user, targetUser: username });
          }
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
    setLoading(true);
    getUser();
    console.log("effectsssssssss");
  }, [username]);

  return (
    !loading && (
      <div className={style.profilePage}>
        <ProfileHero userProfile={userProfile} addFriend={addFriend} />
        <div className={style.sectionTabs}>
          <ul>
            <li
              key={"postsTab"}
              className={`${style.tab} ${
                section === "posts" && style.selectedTab
              }`}
              onClick={() => handleSwitchTab("posts")}
            >
              Posts
              {section === "posts" ? (
                <motion.div
                  transition={{ duration: 0.2 }}
                  className={style.bgColor}
                  layoutId="bgColor"
                />
              ) : null}
            </li>
            <li
              key={"FriendsTab"}
              className={`${style.tab} ${
                section === "friends" && style.selectedTab
              }`}
              onClick={() => handleSwitchTab("friends")}
            >
              Teammates
              {section === "friends" ? (
                <motion.div
                  transition={{ duration: 0.2 }}
                  className={style.bgColor}
                  layoutId="bgColor"
                />
              ) : null}
            </li>
            {user._id === userProfile._id && (
              <li
                key={"SettingsTab"}
                className={`${style.tab} ${
                  section === "settings" && style.selectedTab
                }`}
                onClick={() => handleSwitchTab("settings")}
              >
                Settings
                {section === "settings" ? (
                  <motion.div
                    transition={{ duration: 0.2 }}
                    className={style.bgColor}
                    layoutId="bgColor"
                  />
                ) : null}
              </li>
            )}
          </ul>
        </div>
        {section === "posts" ? (
          <PostsLayout
            url={"post/byUser"}
            miniPost={true}
            userId={userProfile._id}
          />
        ) : section === "settings" ? (
          <div className={style.settingsSection}>
            <h1>Settings</h1>
            <ProfilePlatform />
            <UserGames />
          </div>
        ) : (
          <Friends
            user={userProfile}
            title={
              user.username === userProfile.username
                ? "My Teammates"
                : `${userProfile.username}'s Teammates`
            }
          />
        )}
      </div>
    )
  );
}

export default ProfilePage;
