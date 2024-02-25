import axios from "axios";
import style from "./CreatePost.module.css";
import { useEffect, useState } from "react";
import Select from "../../components/Select/Select";
import DragAndDrop from "../../components/DragnDrop/DragnDrop";
import { useUserStore } from "../../Store/userStore";
import { LuHeart } from "react-icons/lu";
import { LuHeartCrack } from "react-icons/lu";
import { IoChatbubbleOutline } from "react-icons/io5";
function CreatePost() {
  const { user } = useUserStore();
  const [games, setGames] = useState();
  const [loading, setLoading] = useState(true);
  const [acceptedFiles, setAcceptedFiles] = useState();
  const [postType, setPostType] = useState("General");
  const [reaction, setReaction] = useState("");
  const [spoiler, setSpoiler] = useState(false);
  const [caption, setCaption] = useState("");
  const [gameQuery, setGameQuery] = useState("");
  const [image, setImage] = useState();
  const [debounceTimer, setDebounceTimer] = useState(null);

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
      <section
        className={style.gameInfo}
        onClick={() => {
          setGameQuery(game);
          console.log(game);
        }}
      >
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
      <section
        className={style.postType}
        onClick={() => {
          setPostType(type);
          console.log("second");
        }}
      >
        <p className={style.typeText}>{type}</p>
      </section>
    ));
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
    setGameQuery(searchText);
    clearTimeout(debounceTimer);
    const newTimer = setTimeout(() => {
      handleSearch(searchText.trim());
    }, 300);
    setDebounceTimer(newTimer);
  }
  async function createPost() {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      console.log("No files selected.");
      return;
    }
    console.log(acceptedFiles);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}post/create`,
        {
          game: gameQuery,
          caption: caption,
          type: postType,
          image: image,
          isSpoiler: spoiler,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior of Enter key
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    !loading && (
      <section className={style.createPage}>
        <h1>Add a Post</h1>
        <div className={style.mainContentContainer}>
          <div className={style.PostFormConatiner}>
            <label htmlFor="caption">Caption:</label>
            <div style={{ position: "relative", marginBottom: "10px" }}>
              <textarea
                name="caption"
                id="caption"
                className={style.captionTextArea}
                placeholder="Share your thoughts"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={200}
                onKeyDown={handleKeyPress}
              ></textarea>
              <span
                className={style.captionLength}
              >{`${caption.length}/200`}</span>
            </div>
            <div className={style.selectContainers}>
              <section className={style.selectWrapper}>
                <label> Game:</label>
                <Select
                  value={gameQuery}
                  getOptions={getGameOptions}
                  searchable
                  onChange={handleChangeSearch}
                  placeholder={"Select a game"}
                />
              </section>
              <section className={style.selectWrapper}>
                <label> Type:</label>
                <Select value={postType} getOptions={getTypesOptions} />
              </section>
            </div>
            <DragAndDrop
              acceptedFiles={acceptedFiles}
              setAcceptedFiles={setAcceptedFiles}
              image={image}
              setImage={setImage}
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
            <button
              type="button"
              onClick={createPost}
              className={style.submitBtn}
            >
              Submit
            </button>
          </div>
          <div className={style.postPreviewContainer}>
            <div className={style.postPreview}>
              <div className={style.postHeader}>
                <div className={style.userPosterInfo}>
                  <img
                    src={`${import.meta.env.VITE_ENDPOINT}${user.avatar}`}
                    className={style.userAvatar}
                    alt=""
                  />
                  <p>{user.username}</p>
                </div>
                <div className={style.postGameTypeWrapper}>
                  <div className={style.postGame}>
                    {gameQuery.name || "Select a game"}
                  </div>
                  <div className={style.postPreviewType}>
                    {postType || "Select a Type"}
                  </div>
                </div>
              </div>
              <div className={style.postInfo}>
                <div className={style.postInfoHeader}>
                  <p className={style.previewCaption} value={caption} disabled>
                    {caption}
                  </p>
                </div>
                {acceptedFiles ? (
                  <figure className={style.previewImageContainer}>
                    <img
                      src={acceptedFiles.preview}
                      className={style.previewImage}
                    />
                  </figure>
                ) : (
                  <p className={style.imagePlaceholder}>No Image Selected</p>
                )}
                {spoiler && (
                  <div className={style.spoilerBluredLayer}>
                    <button type="button" onClick={() => setSpoiler(false)}>
                      View Spoiler
                    </button>
                  </div>
                )}
              </div>
              <div className={style.postActionController}>
                <div className={style.reactionContainer}>
                  <LuHeart
                    className={`${style.likeIcon} ${
                      reaction === "liked" && style.selectedReaction
                    }`}
                    onClick={() => setReaction("liked")}
                  />
                  <LuHeartCrack
                    className={`${style.dislikeIcon} ${
                      reaction === "disliked" && style.selectedReaction
                    }`}
                    onClick={() => setReaction("disliked")}
                  />
                </div>
                <div className={style.postCommentButtonContainer}>
                  <div>
                    <IoChatbubbleOutline className={style.commentBtnIcon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
}

export default CreatePost;
