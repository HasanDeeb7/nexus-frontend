import axios from "axios";
import style from "./CreatePost.module.css";
import { useEffect, useState } from "react";
import Select from "../../components/Select/Select";
import DragAndDrop from "../../components/DragnDrop/DragnDrop";

function CreatePost() {
  const [games, setGames] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState("Select a Game");
  const [acceptedFiles, setAcceptedFiles] = useState();
  const [postType, setPostType] = useState("General");
  const [spoiler, setSpoiler] = useState(false);
  async function getGames() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_ENDPOINT}game`);
      if (response) {
        setGames(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function getGameOptions() {
    return games.map((game) => (
      <section className={style.gameInfo} onClick={() => setSelectedGame(game)}>
        <img
          src={`${import.meta.env.VITE_ENDPOINT}${game.image}`}
          className={style.selectGameImage}
          alt=""
        />
        <p className={style.gameName}>{game.name}</p>
      </section>
    ));
  }
  function getTypesOptions() {
    return ["News", "Meme", "Game Shot", "Help"].map((type) => (
      <section className={style.postType} onClick={() => setPostType(type)}>
        <p className={style.typeText}>{type}</p>
      </section>
    ));
  }

  useEffect(() => {
    getGames();
  }, []);

  return (
    !loading && (
      <section className={style.createPage}>
        <h1>Add a Post</h1>
        <div className={style.mainContentContainer}>
          <div className={style.PostFormConatiner}>
            <div className={style.select}>
              <Select value={selectedGame} getOptions={getGameOptions} />
              <Select value={postType} getOptions={getTypesOptions} />
            </div>
            <DragAndDrop
              acceptedFiles={acceptedFiles}
              setAcceptedFiles={setAcceptedFiles}
            />
            <div className={style.spoilerControl}>
              <label htmlFor="spoiler">Mark as a spoiler</label>
              <input
                type="checkbox"
                name="spoiler"
                id="spoiler"
                value={spoiler}
                checked={spoiler === true}
                onChange={() => {
                  setSpoiler(!spoiler);
                }}
              />
            </div>
          </div>
          <div className={style.postPreviewContainer}></div>
        </div>
      </section>
    )
  );
}

export default CreatePost;
