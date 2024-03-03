import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../Store/userStore";
import GameCard from "../../components/Game Card/GameCard";
import style from "./UserGames.module.css";
import { useLoadingStore } from "../../Store/loadingStore";

function UserGames() {
  const { setLoadingWall } = useLoadingStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  function handleClick() {
    setLoadingWall(true);
    setTimeout(() => {
      navigate("/Select-games");
    }, 1000);
  }
  return (
    <div className={style.userGamesSection}>
      <div className={style.userGamesHeader}>
        <h2> My games</h2>
        <button className={style.editGamesBtn} onClick={handleClick}>
          Edit
        </button>
      </div>
      <div className={style.userGamesContainer}>
        {user.games?.map((game, idx) => {
          return <GameCard key={idx} game={game} viewOnly />;
        })}
      </div>
    </div>
  );
}

export default UserGames;
