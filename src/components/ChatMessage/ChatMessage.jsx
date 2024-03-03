import { useUserStore } from "../../Store/userStore";
import style from "./ChatMessage.module.css";

function ChatMessage({ username, message }) {
  const { user } = useUserStore();
  return (
    <div
      className={`${style.message} ${
        username === user.username ? style.messageSender : style.messageReceiver
      }`}
    >
      <span className={style.user}>{username}</span>
      <p className={style.messageContent}>{message}</p>
    </div>
  );
}

export default ChatMessage;
