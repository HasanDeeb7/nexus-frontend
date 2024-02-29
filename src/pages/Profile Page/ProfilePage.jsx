import { useLocation, useParams } from "react-router-dom";
import style from "./ProfilePage.module.css";
import { useUserStore } from "../../Store/userStore";

import ProfileHero from "../../layouts/ProfileHero/ProfileHero";
import axios from "axios";
import PostsLayout from "../../layouts/PostsLayout/PostsLayout";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProfilePlatform from "../../layouts/ProfilePlatform/ProfilePlatform";
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
    console.log("here");
    if (username) {
      console.log("down here");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_ENDPOINT}user/by-username`,
          { params: { username: username } }
        );
        if (res) {
          console.log(res.data);
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
          console.log(res.data);
          setUserProfile(res.data.targetUser);
          setUser({ ...user, friends: res.data?.user?.friends });
          // setLoading(false);
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
    getUser();
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
            {user._id === userProfile._id && (
              <li
                key={"platformTab"}
                className={`${style.tab} ${
                  section === "platform" && style.selectedTab
                }`}
                onClick={() => handleSwitchTab("platform")}
              >
                Add Platform
                {section === "platform" ? (
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
        ) : (
          <ProfilePlatform />
        )}
      </div>
    )
  );
}

export default ProfilePage;
