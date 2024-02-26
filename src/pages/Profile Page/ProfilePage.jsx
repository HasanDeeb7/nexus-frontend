import { useParams } from "react-router-dom";
import style from "./ProfilePage.module.css";
import { useUserStore } from "../../Store/userStore";

import ProfileHero from "../../layouts/ProfileHero/ProfileHero";
import axios from "axios";
import PostsLayout from "../../layouts/PostsLayout/PostsLayout";
import { useState } from "react";
import { motion } from "framer-motion";
function ProfilePage() {
  const { user } = useUserStore();
  const { username } = useParams();
  const [section, setSection] = useState("posts");
  const userProfile = username || user;
  function handleSwitchTab(tab) {
    setSection(tab);
  }

  return (
    <>
      <ProfileHero user={userProfile} />
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
        </ul>
      </div>
      {section === "posts" && <PostsLayout url={"post/byUser"} />}
    </>
  );
}

export default ProfilePage;
