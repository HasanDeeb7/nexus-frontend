import Avvvatars from "avvvatars-react";
import style from "./Comment.module.css";
import { LuHeart } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";
import { useUserStore } from "../../Store/userStore";
import { useEffect, useState } from "react";
import axios from "axios";

function Comment({ comment, onLike, idx, comments, setComments }) {
  const { user } = useUserStore();
  const [isLiked, setIsLiked] = useState(
    comment.likes.length > 0 && comment.likes.includes(user._id)
  );
  const [likesCount, setLikesCount] = useState(comment.likes?.length);
  async function deleteComment() {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_ENDPOINT}post/delete-comment`,
        { params: { commentId: comment._id, postId: comment.post } }
      );
      if (response) {
        const newComments = comments.filter((item, index) => item != comment);
        setComments(newComments);

        // setComments(response.data);
        //  (newComments);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setIsLiked(comment.likes.length > 0 && comment.likes.includes(user._id));
    setLikesCount(comment.likes?.length);
  }, [comments]);
  return (
    <div className={style.comment}>
      <div className={style.commentUser}>
        {comment.user.avatar ? (
          <img
            src={`${import.meta.env.VITE_ENDPOINT}${comment.user.avatar}`}
            className={style.commentUserAvatar}
          />
        ) : (
          <Avvvatars value={comment.user.username} size={28} />
        )}

        <span className={style.commentUserName}>{comment.user.username}</span>
        {comment.user._id === user._id && (
          <LuTrash onClick={deleteComment} className={style.deleteTrashIcon} />
        )}
      </div>
      <div className={style.commentContentWrapper}>
        <span>{comment.content}</span>
        <div className={style.commentActions}>
          <LuHeart
            onClick={() => {
              onLike(comment._id, isLiked, idx), setIsLiked(!isLiked);
              isLiked
                ? setLikesCount(likesCount - 1)
                : setLikesCount(likesCount + 1);
            }}
            className={`${style.commentLike} ${isLiked && style.commentLiked}`}
          />
          <span>{likesCount}</span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
