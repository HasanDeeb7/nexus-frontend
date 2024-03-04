import { useUserStore } from "../../Store/userStore";
import Contact from "../Contact/Contact";
import style from "./ChatContacts.module.css";

function ChatContacts({chatWith, activeChat}) {
  const { user } = useUserStore();
  return (
    <div className={style.chatContactsLayout}>
      <h2>Contacts</h2>
      <div className={style.contactsContainer}>
        {user.friends.map((item, idx) => (
          <Contact
            chatWith={chatWith}
            username={item.username}
            avatar={
              item.avatar && `${import.meta.env.VITE_ENDPOINT}${item.avatar}`
            }
            activeChat={activeChat}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatContacts;
