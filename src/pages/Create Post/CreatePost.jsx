import axios from "axios";
import style from "./CreatePost.module.css";
import { useEffect, useState } from "react";
import Select from "../../components/Select/Select";
import DragAndDrop from "../../components/DragnDrop/DragnDrop";
import { useUserStore } from "../../Store/userStore";
import { LuHeart } from "react-icons/lu";
import { LuHeartCrack } from "react-icons/lu";
import { IoChatbubbleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
function CreatePost() {
  const postId = useParams().post_id;
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
  const [imageLink, setImageLink] = useState("");
  const navigate = useNavigate();

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
    return games.map((game, idx) => (
      <section
        key={idx}
        className={style.gameInfo}
        onClick={() => {
          setGameQuery(game);
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
  async function getOnePost() {
    const response = await axios.get(
      `${import.meta.env.VITE_ENDPOINT}post/one`,
      { params: { postId: postId } }
    );
    if (response) {
      setPostType(response.data.type);
      setCaption(response.data.caption);
      setSpoiler(response.data.isSpoiler);
      setGameQuery(response.data.game);
      setImageLink(response.data.image);
    }
  }
  useEffect(() => {
    if (postId) {
      getOnePost();
    }
  }, []);
  function getTypesOptions() {
    return ["News", "Meme", "Game Shot", "Help"].map((type, idx) => (
      <section
        className={style.postType}
        onClick={() => {
          setPostType(type);
          ("second");
        }}
        key={idx}
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
  async function submit() {
    if (!gameQuery.name) {
      return toast.error("Please Select a valid game");
    }
    if (postId) {
      updatePost();
    } else {
      if (!acceptedFiles || acceptedFiles.length === 0) {
        ("No files selected.");
        // return;
      }
      acceptedFiles;
      if (
        [acceptedFiles, gameQuery, postType].some(
          (value) => !value || value === ""
        )
      ) {
        return toast.error("All fields are required");
      }
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
          navigate("/home");
          toast("Post created Successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior of Enter key
    }
  };
  async function updatePost() {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_ENDPOINT}post/edit`,
        {
          postId,
          caption,
          isSpoiler: spoiler,
          game: gameQuery,
          postType: postType,
          image: image ? image : null,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getGames();
  }, []);

  return (
    !loading && (
      <section className={style.createPage}>
        <div className={style.mainContentContainer}>
          <div className={style.PostFormConatiner}>
            <h1>Add a Post</h1>
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
            <button type="button" onClick={submit} className={style.submitBtn}>
              {postId ? "Update" : "Submit"}
            </button>
          </div>
          <div className={style.postPreviewContainer}>
            <h1>Preview</h1>

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
                ) : imageLink ? (
                  <figure className={style.previewImageContainer}>
                    <img
                      src={`${import.meta.env.VITE_ENDPOINT}${imageLink}`}
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
