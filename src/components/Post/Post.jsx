import React, { useRef, useState } from "react";
import style from "./Post.module.css";
import { RiChat3Line } from "react-icons/ri";
import { LuHeart } from "react-icons/lu";
import axios from "axios";
import { useUserStore } from "../../Store/userStore";
import Avvvatars from "avvvatars-react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { GoKebabHorizontal } from "react-icons/go";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { usePostStore } from "../../Store/postStore";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

function Post({ post, miniPost = false }) {
  const [spoiler, setSpoiler] = useState(post.isSpoiler);
  const elementsRef = useRef([]);
  const pushRef = (el) => elementsRef.current.push(el);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { posts, setPosts } = usePostStore();
  const { user } = useUserStore();
  const [likes, setLikes] = useState(post.reactions.length);
  const navigate = useNavigate();
  const [reaction, setReaction] = useState(
    post.reactions?.some((item) => {
      if (item.user === user._id) {
        return true;
      }
    })
  );

  async function LikePost() {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_ENDPOINT}post/react`,
        { postId: post._id, reaction: "Like" }
      );
      if (response.status === 200) {
        response.data;
        setReaction(true);
        setLikes((prev) => prev + 1);
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

  async function deletePost() {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_ENDPOINT}post/delete`,
        { params: { id: post._id } }
      );
      if (response) {
        toast("Post deleted successfully");
        setPosts(posts.filter((item) => post._id !== item._id));
        setIsMenuOpen(false);
        setIsModalOpen(false);
      } else {
        toast.error("An error has occured ");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return !miniPost ? (
    <>
      {isModalOpen && (
        <ConfirmModal
          message={"Post will be deleted, Confirm?"}
          closeHandler={() => setIsModalOpen(false)}
          action={deletePost}
        />
      )}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        className={style.postPreviewContainer}
        onClick={(e) => {
          if (
            elementsRef.current.some((ref) => ref && ref.contains(e.target))
          ) {
            return;
          } else {
            navigate(`/comments/${post._id}`);
          }
        }}
      >
        <div className={style.postPreview}>
          {post.user.username === user.username && (
            <div
              className={style.kebabMenu}
              ref={pushRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <GoKebabHorizontal />
            </div>
          )}
          {isMenuOpen && (
            <ul className={style.menuDialog} ref={pushRef}>
              <li
                className={style.menuItem}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                {" "}
                <FaRegTrashCan />
                Delete{" "}
              </li>
              <li
                className={style.menuItem}
                onClick={() => navigate("/post/" + post._id)}
              >
                <FaRegEdit />
                Edit{" "}
              </li>
            </ul>
          )}
          <div className={style.postHeader}>
            <div
              className={style.userPosterInfo}
              ref={pushRef}
              onClick={() => navigate(`/profile/${post.user.username}`)}
            >
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
              <div className={style.spoilerBluredLayer} ref={pushRef}>
                <button type="button" onClick={() => setSpoiler(false)}>
                  View Spoiler
                </button>
              </div>
            )}
          </div>
          <div className={style.postActionController}>
            <div
              ref={pushRef}
              id="Like"
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
              <div>
                <RiChat3Line className={style.commentBtnIcon} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  ) : (
    <div
      className={`${style.previewImageContainer} ${style.miniPost}`}
      onClick={() => navigate(`/comments/${post._id}`)}
    >
      <img
        src={`${import.meta.env.VITE_ENDPOINT}${post.image}`}
        alt=""
        className={style.miniPreviewImage}
      />
      {spoiler && (
        <div className={style.spoilerBluredLayer} ref={pushRef}>
          <button type="button" onClick={() => setSpoiler(false)}>
            Spoiler
          </button>
        </div>
      )}
    </div>
  );
}

export default Post;
