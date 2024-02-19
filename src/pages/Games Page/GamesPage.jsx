import axios from "axios";
import { useEffect, useState } from "react";
import style from "./GamesPage.module.css";
import { useErrorStore } from "../../Store/errorStore";
import Input from "../../components/Input/Input";
import GameCard from "../../components/Game Card/GameCard";
import { useLoadingStore } from "../../Store/loadingStore";
import { useUserStore } from "../../Store/userStore";

function GamesPage() {
  const { error, setError } = useErrorStore();
  const [search, setSearch] = useState({ text: "" });
  const [games, setGames] = useState();
  const { loadingWall, setLoadingWall } = useLoadingStore();
  const [loading, setLoading] = useState(true);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const { user } = useUserStore();
  const [selectedGames, setSelectedGames] = useState(user.games);

  async function getGames() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_ENDPOINT}game/`);
      if (response) {
        setGames(response.data);
        setLoadingWall(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError("Error getting games data");
    }
  }
  async function addGames() {
    let gameIds = [];
    selectedGames.map((item) => gameIds.push(item._id));
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_ENDPOINT}user/add-games`,
        { games: gameIds }
      );
      if (response) {
        console.log("Your games have been updated.");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSearch(query) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}game/${query}`
      );
      if (response) {
        setGames(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChangeSearch(e) {
    const searchText = e.target.value;
    setSearch({ text: searchText });
    clearTimeout(debounceTimer);
    const newTimer = setTimeout(() => {
      handleSearch(searchText.trim());
    }, 300);
    setDebounceTimer(newTimer);
  }

  function handleSelectGame(game) {
    const { _id } = game;

    if (selectedGames.some((item) => item._id === _id)) {
      return;
    }
    setSelectedGames([...selectedGames, game]);
  }

  function isSelected(game) {
    const { _id } = game;
    return selectedGames.some((item) => item._id === _id);
  }

  useEffect(() => {
    setLoadingWall(true);
    getGames();
  }, []);

  return (
    !loadingWall &&
    !loading && (
      <div
        className={style.gamesPageContainer}
        onClick={console.log(selectedGames)}
      >
        <h1>Select your favorite games!</h1>
        <header className={style.pageHeader}>
          <div className={style.searchBarContainer}>
            <p>Search: </p>
            <Input
              value={search}
              setValue={setSearch}
              control={"text"}
              label={""}
              onChange={handleChangeSearch}
            />
          </div>
        </header>
        <main className={style.pageContentContainer}>
          <h2>Browse</h2>
          <section className={style.gamesContainer}>
            {games.map((game, idx) => (
              <GameCard
                game={game}
                key={idx}
                isSelected={isSelected(game)}
                onClick={() => handleSelectGame(game)}
              />
            ))}
          </section>
        </main>
        <footer className={style.gamePageFooter}>
          <div className={style.footerContent}>
            <h3>Selected Games : </h3>
            <div className={style.selectedGamesContainer}>
              {selectedGames.length
                ? selectedGames.map((game, idx) => (
                    <GameCard
                      game={game}
                      key={idx}
                      miniCard
                      removeSelectedGame={() => {
                        const updatedSelectedGames = selectedGames.filter(
                          (selectedGame) => selectedGame !== game
                        );
                        setSelectedGames(updatedSelectedGames);
                      }}
                    />
                  ))
                : ""}
            </div>
            <section className={style.footerActions}>
              <div className={style.footerBtnsContainer}>
                <button
                  type="button"
                  className={style.primaryBtn}
                  onClick={addGames}
                >
                  Apply
                </button>
                <button type="button" className={style.secondaryBtn}>
                  Skip
                </button>
              </div>
            </section>
          </div>
        </footer>
      </div>
    )
  );
}

export default GamesPage;
