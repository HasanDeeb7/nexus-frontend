import { useUserStore } from "../../Store/userStore";
import convertISOToDateTime from "../../utils/convertTime";
import style from "./ChatMessage.module.css";

function ChatMessage({ username, message, privateMessage = false, time }) {
  const { user } = useUserStore();
  console.log(time);
  return (
    <div
      className={`${style.message} ${
        username === user.username ? style.messageSender : style.messageReceiver
      }`}
    >
      {!privateMessage && <span className={style.user}>{username}</span>}
      <p className={style.messageContent}>{message}</p>
      <p className={style.time}>{convertISOToDateTime(time)}</p>
    </div>
  );
}

export default ChatMessage;
