import { useParams } from "react-router-dom";
import style from "./SinglePost.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Avvvatars from "avvvatars-react";
import { useUserStore } from "../../Store/userStore";
import { LuHeart } from "react-icons/lu";
import { RiChat3Line } from "react-icons/ri";
import Comment from "../../components/Comment/Comment";
import { AnimatePresence } from "framer-motion";
import { BsFilePostFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { IoGameController } from "react-icons/io5";
import { FaPlaystation } from "react-icons/fa6";
import { LiaXbox } from "react-icons/lia";
import { LuPcCase } from "react-icons/lu";
import userBackground from "/public/images/pattern1.jpg";
function SinglePost() {
  const { postId } = useParams();
  const { user } = useUserStore();
  const [post, setPost] = useState();
  const [spoiler, setSpoiler] = useState();
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState();
  const [reaction, setReaction] = useState();
  const [loading, setLoading] = useState(true);

  const platformIcons = {
    PS: <FaPlaystation className={`${style.platformIcon} ${style.PSIcon}`} />,
    Xbox: <LiaXbox className={`${style.platformIcon} ${style.XboxIcon}`} />,
    PC: <LuPcCase className={`${style.platformIcon} ${style.PCIcon}`} />,
  };

  async function getPost() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}post/one`,
        {
          params: { postId },
        }
      );
      if (response) {
        setPost(response.data);
        setSpoiler(response.data.isSpoiler);
        setLikes(response.data.reactions.length);
        getComments(response.data._id);
        setReaction(
          response.data?.reactions?.some((item) => {
            if (item.user === user._id) {
              return true;
            }
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function LikePost() {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_ENDPOINT}post/react`,
        { postId: post._id, reaction: "Like" }
      );
      if (response.status === 200) {
        setReaction(true);
        setLikes((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getComments(postId) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}post/get-comments`,
        { params: { postId: postId } }
      );
      if (response.status === 200) {
        console.log(response.data);
        setComments(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function unlikePost() {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_ENDPOINT}post/remove-reaction`,
        { postId: post._id }
      );
      if (response) {
        setReaction(false);
        setLikes((prev) => prev - 1);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function addComment() {
    setNewComment("");
    const newCommentObj = { content: newComment, user: user, likes: [] };

    setComments((prevComments) => [newCommentObj, ...prevComments]);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_ENDPOINT}post/comment`,
        { postId: postId, content: newComment }
      );
      if (response) {
        console.log(response.data);
        setComments([response.data, ...comments]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleLikeComment(commentId, isLiked, idx) {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_ENDPOINT}post/like-comment`,
        {
          commentId: commentId,
          action: isLiked ? "dislike" : "like",
        }
      );
      if (response) {
        console.log(response.data);
        setComments(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPost();
  }, []);
  return (
    post &&
    !loading && (
      <div className={style.postPreviewContainer}>
        <div className={style.userInfo}>
          <div className={style.userDetails}>
            <span>{post.user.username}</span>
            <div className={style.userActivitiesContainer}>
              <div className={style.detailContainer}>
                <div className={style.detail}>
                  <span className={style.number}>
                    {post.user?.posts?.length}
                  </span>{" "}
                  <BsFilePostFill className={style.activityIcon} />
                </div>
              </div>
              <div className={style.detailContainer}>
                <div className={style.detail}>
                  <span className={style.number}>
                    {post.user?.friends?.length}{" "}
                  </span>
                  <RiTeamFill className={style.activityIcon} />
                </div>
              </div>
              <div className={style.detailContainer}>
                <div className={style.detail}>
                  <span className={style.number}>
                    {post.user?.games?.length}
                  </span>{" "}
                  <IoGameController className={style.activityIcon} />
                </div>
              </div>
            </div>
            <div className={style.platformsContainer}>
              {post.user.platforms.map((platform) => (
                <div className={style.platform}>
                  {platformIcons[platform.name]}
                  <span> {platform.username}</span>
                </div>
              ))}
            </div>
          </div>
          <img src={userBackground} className={style.userBackgroundImage} />
        </div>
        <div className={style.postPreview}>
          <div className={style.postHeader}>
            <div className={style.userPosterInfo}>
              {post.user.avatar ? (
                <img
                  src={`${import.meta.env.VITE_ENDPOINT}${post.user.avatar}`}
                  className={style.userAvatar}
                  alt=""
                />
              ) : (
                <Avvvatars value={post.user.username} size="40" />
              )}

              <p>{post.user.username}</p>
            </div>
            <div className={style.postGameTypeWrapper}>
              <div className={style.postGame}>{post.game.name}</div>
              <div className={style.postPreviewType}>{post.type}</div>
            </div>
          </div>
          <div className={style.postInfo}>
            <div className={style.postInfoHeader}>
              <p className={style.previewCaption} disabled>
                {post.caption}
              </p>
            </div>

            <figure className={style.previewImageContainer}>
              <img
                src={`${import.meta.env.VITE_ENDPOINT}${post.image}`}
                className={style.previewImage}
              />
            </figure>

            {spoiler && (
              <div className={style.spoilerBluredLayer}>
                <button type="button" onClick={() => setSpoiler(false)}>
                  View Spoiler
                </button>
              </div>
            )}
          </div>
          <div className={style.postActionController}>
            <div
              className={style.reactionContainer}
              onClick={
                !reaction
                  ? () => {
                      LikePost("Like");
                    }
                  : () => unlikePost()
              }
            >
              <LuHeart
                className={`${style.likeIcon} ${
                  reaction && style.selectedReaction
                }`}
              />
              <span style={{ fontSize: "13.5px" }}>{likes}</span>
            </div>
            <div className={style.postCommentButtonContainer}>
              <div className={style.commentsIndicator}>
                <RiChat3Line className={style.commentBtnIcon} />
                <span style={{ fontSize: "13.5px" }}>{comments.length}</span>
              </div>
            </div>
          </div>
          <span>Add a comment</span>
          <div className={style.addCommentContainer}>
            <textarea
              name="comment"
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              maxLength={200}
              className={style.commentInput}
              placeholder="Comment on this post"
            ></textarea>
            <div className={style.commentSubmit}>
              <button
                type="button"
                className={style.commentBtn}
                onClick={addComment}
              >
                Comment
              </button>
            </div>
          </div>
          <div className={style.commentsContainer}>
            {comments.map((comment, idx) => (
              <Comment
                layout={true}
                key={idx}
                comment={comment}
                onLike={handleLikeComment}
                idx={idx}
                comments={comments}
                setComments={setComments}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default SinglePost;
