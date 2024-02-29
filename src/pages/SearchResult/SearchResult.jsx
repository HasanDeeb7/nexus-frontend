import { useLocation } from "react-router-dom";
import style from "./SearchResult.module.css";

function SearchResult() {
  const { posts, users, postByGames } = useLocation().state.data;
  console.log(useLocation().state.data);

  return (
    <div className={style.resultsContainer}>
      <div className={style.usersResult}>
        {users.length > 0
          ? users.map((item) => <div key={item._id}>Users{item.username}</div>)
          : ""}
      </div>
      <div className={style.postsResult}>
        {posts.length > 0
          ? posts.map((item) => <div key={item._id}>Posts{item.type}</div>)
          : ""}
      </div>
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
