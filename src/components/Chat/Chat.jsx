import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../Store/userStore";
import style from "./Chat.module.css";
import { TbSend } from "react-icons/tb";
import pattern1 from "/images/pattern1.jpg";
import { socket } from "../../App";
import ChatMessage from "../ChatMessage/ChatMessage";
import { HiArrowUturnLeft } from "react-icons/hi2";

function Chat({ chatData, activeChat, setChatData, setActiveChat }) {
  const messageEl = useRef(null);

  const { user } = useUserStore();
  const [newMessage, setNewMessage] = useState("");
  function handleChange(e) {
    setNewMessage(e.target.value);
  }
  function sendMessage() {
    if (newMessage.trim() === "" || !newMessage) {
      return;
    }
    console.log(chatData);
    socket.emit("send-message", {
      sender: user,
      receiver: activeChat,
      message: newMessage,
      createdAt: new Date(),
    });
    setChatData([
      ...chatData,
      { sender: user, content: newMessage, createdAt: new Date() },
    ]);
    setNewMessage("");
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }
  useEffect(() => {
    socket.on("receive-message", (data) => {
      console.log(chatData);
      if (activeChat === data.sender.username) {
        setChatData([
          ...chatData,
          {
            sender: data.sender,
            content: data.message,
            createdAt: data.createdAt,
          },
        ]);
      }
    });
    console.log(chatData);
  }, [chatData]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (messageEl.current) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  };
  console.log(chatData);

  return (
    <div className={style.chat}>
      {activeChat && <HiArrowUturnLeft onClick={() => setActiveChat(null)} className={style.arrowIcon} />}
      <img src={pattern1} alt="" className={style.bgImage} />
      <div className={style.chatDataContainer} ref={messageEl}>
        {chatData.map((message) => (
          //   <div
          //     className={` ${style.chatMessage} ${
          //       message.sender.username === user.username
          //         ? style.sender
          //         : style.receiver
          //     }`}
          //   >
          <div className={style.chatWrapper}>
            <ChatMessage
              username={message.sender.username}
              message={message.content}
              time={message.createdAt}
              privateMessage
            />
          </div>
        ))}
      </div>
      {chatData && (
        <div className={style.inputContainer}>
          <input
            type="text"
            value={newMessage}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button className={style.sendBtn}>
            <TbSend className={style.sendIcon} onClick={sendMessage} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Chat;
