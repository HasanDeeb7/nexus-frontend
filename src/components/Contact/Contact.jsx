import Avvvatars from "avvvatars-react";
import style from "./Contact.module.css";

function Contact({ username, avatar, lastMessage, chatWith, activeChat }) {
  return (
    <div className={`${style.contact} ${activeChat === username && style.activeContact}`} onClick={() => chatWith(username)}>
      {avatar ? (
        <img src={avatar} className={style.contactAvatar} />
      ) : (
        <Avvvatars value={username} size={35} />
      )}
      <div className={style.info}>
        <span>{username}</span>
        <span>{lastMessage && lastMessage}</span>
      </div>
    </div>
  );
}

export default Contact;
