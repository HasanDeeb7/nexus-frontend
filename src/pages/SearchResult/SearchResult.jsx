import { useLocation } from "react-router-dom";
import style from "./SearchResult.module.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Friends from "../../layouts/Friends/Friends";
import PostsLayout from "../../layouts/PostsLayout/PostsLayout";
import { usePostStore } from "../../Store/postStore";
function SearchResult() {
  const { posts: resultPosts, users, postByGames } = useLocation().state.data;
  const query = useLocation().state.query;
  const [activeTab, setActiveTab] = useState("users");
  const { posts, setPosts } = usePostStore();
  function handleSwitchTab(tab) {
    setActiveTab(tab);
  }
  const title = <h1 style={{ marginBottom: "20px" }}>Results for "{query}"</h1>;
  useEffect(() => {
    console.log(resultPosts);
    setPosts(resultPosts);
  }, [resultPosts]);
  return (
    <div className={style.resultsContainer}>
      <div className={style.sectionTabs}>
        <ul>
          <li
            key={"usersTab"}
            className={`${style.tab} ${
              activeTab === "users" && style.selectedTab
            }`}
            onClick={() => handleSwitchTab("users")}
          >
            Users
            {activeTab === "users" ? (
              <motion.div
                transition={{ duration: 0.2 }}
                className={style.bgColor}
                layoutId="bgColor"
              />
            ) : null}
          </li>
          <li
            key={"postsTab"}
            className={`${style.tab} ${
              activeTab === "posts" && style.selectedTab
            }`}
            onClick={() => handleSwitchTab("posts")}
          >
            Posts
            {activeTab === "posts" ? (
              <motion.div
                transition={{ duration: 0.2 }}
                className={style.bgColor}
                layoutId="bgColor"
              />
            ) : null}
          </li>
        </ul>
      </div>
      {activeTab === "users" ? (
        <div className={style.usersResult}>
          {title}

          <Friends user={{ friends: users }} />
        </div>
      ) : activeTab === "posts" ? (
        <div className={style.postsResult}>
          {title}

          <PostsLayout posts={resultPosts} all />
        </div>
      ) : null}
      {/* <div className={style.postByGames}>
        {postByGames.length > 0
          ? postByGames.map((item) => (
              <div key={item._id}>ByGames{item.type}</div>
            ))
          : ""}
      </div> */}
    </div>
  );
}

export default SearchResult;
