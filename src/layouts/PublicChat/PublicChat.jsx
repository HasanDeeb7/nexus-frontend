import { useEffect, useState } from "react";
import { useChatStore } from "../../Store/publicChat";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import style from "./PublicChat.module.css";
import { socket } from "../../App";
import { useUserStore } from "../../Store/userStore";
import convertISOToDateTime from "../../utils/convertTime";

function PublicChat() {
  const { messages, setMessages } = useChatStore();
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUserStore();
  function sendMessage() {
    if (!newMessage || newMessage === "") {
      return;
    }
    socket.emit("broadcast-message", {
      message: newMessage,
      username: user.username,
      time: new Date(),
    });
    setMessages({
      message: newMessage,
      username: user.username,
      time: new Date(),
    });
     (messages);
    setNewMessage("");
  }

  useEffect(() => {
    socket.on("receive-broadcast-message", ({ username, message, time }) => {
      setMessages({
        username: username,
        message: message,
        time: time,
      });
    });
  }, []);

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // 👇️ call submit function here
      sendMessage();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [newMessage]);

  return (
    <div className={style.broadcastLayout}>
      <h1>Broadcast</h1>
      <div className={style.chatContentWrapper}>
        {messages.map((item) => (
          <ChatMessage
            username={item.username}
            message={item.message}
            time={item.time}
          />
        ))}
      </div>
      <div className={style.inputWrapper}>
        <textarea
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={style.broadcastInput}
        />
        <button className={style.sendBtn} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default PublicChat;
