import { useEffect, useState } from "react";
import { useLoadingStore } from "../../Store/loadingStore";
import style from "./PostsLayout.module.css";
import { usePostStore } from "../../Store/postStore";
import axios from "axios";
import Post from "../../components/Post/Post";
import { useUserStore } from "../../Store/userStore";
import { NavLink } from "react-router-dom";

function PostsLayout({ url, userId, miniPost = false, all = false }) {
  const [debounceTimer, setDebounceTimer] = useState(null);
  const { posts, setPosts } = usePostStore();
  const { setLoadingWall } = useLoadingStore();
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(miniPost ? 30 : 5);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useUserStore();
  async function getPosts() {
    if (!all) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_ENDPOINT}${url}`,
          {
            params: {
              pageNumber: 1,
              pageSize: pageSize,
              userId: userId || user._id,
            },
          }
        );
        if (response) {
          setPosts(response.data);
          setLoading(false);
          setTimeout(() => {
            setLoadingWall(false);
          }, 1000);
          if (response.data.length < pageSize) {
            setHasMore(false);
          }
        } else {
          ("No data foundd");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  function handleScroll() {
    clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1000 >=
        document.documentElement.offsetHeight
      ) {
        if (!loading && hasMore) {
          if (miniPost) {
            setPageSize((prevPageSize) => prevPageSize + 30);
          } else {
            setPageSize((prevPageSize) => prevPageSize + 5);
          }
        }
      }
    }, 100);

    setDebounceTimer(timer);
  }

  useEffect(() => {
    getPosts();
    posts;
  }, [pageSize]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    !loading && (
      <div className={style.PostsLayoutContainer}>
        <section
          className={!miniPost ? style.postsSection : style.miniPostsSection}
        >
          {posts.length > 0 ? (
            posts.map((post, idx) => (
              <Post post={post} key={idx} miniPost={miniPost} />
            ))
          ) : (
            <p className={style.noPosts}>
              No Posts Found, Try adding{" "}
              <NavLink to={"/select-games"}> more games</NavLink> to your
              selection
            </p>
          )}
        </section>
      </div>
    )
  );
}

export default PostsLayout;
