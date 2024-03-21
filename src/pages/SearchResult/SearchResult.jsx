import { useLocation, useParams } from "react-router-dom";
import style from "./SearchResult.module.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Friends from "../../layouts/Friends/Friends";
import PostsLayout from "../../layouts/PostsLayout/PostsLayout";
import { usePostStore } from "../../Store/postStore";
import { LuSearch } from "react-icons/lu";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
function SearchResult() {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({
    posts: [],
    users: [],
    // postByGames: postByGames,
  });
  const [query, setQuery] = useState(useParams().search || "");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const { posts, setPosts } = usePostStore();

  const [activeTab, setActiveTab] = useState("users");
  function handleSwitchTab(tab) {
    setActiveTab(tab);
  }

  // function handleKeyDown(e) {

  // }
  async function handleSearch(searchQuery) {
     (query);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}search`,
        { params: { query: searchQuery ? searchQuery : query } }
      );
      if (response) {
         (response.data);
        setPosts(response.data.posts);
        setResults({
          ...results,
          users: response.data.users,
          posts: response.data.posts,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  function handleChangeSearch(e) {
    setLoading(true);

    const searchText = e.target.value;
    setQuery(searchText);
    clearTimeout(debounceTimer);
    const newTimer = setTimeout(() => {
      handleSearch(searchText.trim());
    }, 300);
    setDebounceTimer(newTimer);
  }
  const title = <h1 style={{ marginBottom: "20px" }}>Results for "{query}"</h1>;
  useEffect(() => {
     (results);
    handleSearch();
  }, []);
  useEffect(() => {
     (results);
  }, [results.users]);
  return (
    <div className={style.resultsContainer}>
      <div className={style.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          className={style.searchInput}
          value={query}
          // onKeyDown={handleKeyDown}
          onChange={handleChangeSearch}
        />
        <LuSearch size={20} color="#959DA5" className={style.searchIcon} />
      </div>
      {!loading ? (
        <>
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
              {results.users.length > 0 ? (
                <Friends user={{ friends: results.users }} />
              ) : (
                <div className={style.notFoundQuery}>
                  No users found with '{query}'!
                </div>
              )}
            </div>
          ) : activeTab === "posts" ? (
            <div className={style.postsResult}>
              {results.posts.length > 0 ? (
                <PostsLayout all />
              ) : (
                <div className={style.notFoundQuery}>
                  No posts found with '{query}'!
                </div>
              )}
            </div>
          ) : null}
          {/* <div className={style.postByGames}>
        {postByGames.length > 0
          ? postByGames.map((item) => (
              <div key={item._id}>ByGames{item.type}</div>
            ))
          : ""}
      </div> */}
        </>
      ) : (
        <div className={style.loadingContainer}>
          <Loading />
        </div>
      )}
    </div>
  );
}

export default SearchResult;
