import { useEffect, useState } from "react";
import ChatContacts from "../../components/ChatContacts/ChatContacts";
import NavBar from "../../components/NavBar/NavBar";
import style from "./ChatPage.module.css";
import Chat from "../../components/Chat/Chat";
import { useUserStore } from "../../Store/userStore";
import axios from "axios";
import { useChatStore } from "../../Store/publicChat";

function ChatPage() {
  const [loading, setLoading] = useState(true);
  const { setPrivateChat } = useChatStore();
  const [activeChat, setActiveChat] = useState();
  const [chatData, setChatData] = useState();
  const { user: currentUser } = useUserStore();
  function chatWith(user) {
    setActiveChat(user);
    getChat(user);
  }
  async function getChat(targetUser) {
    console.log(targetUser);
    try {
      const response = await axios.get(`${import.meta.env.VITE_ENDPOINT}room`, {
        params: { targetUser: targetUser },
      });
      if (response) {
        console.log(response.data);
        setChatData(response.data.messages);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setPrivateChat(true);
  }, []);
  return (
    <>
      <NavBar />
      <div className={style.chatPage}>
        <ChatContacts chatWith={chatWith} activeChat={activeChat} />
        {!loading && (
          <Chat
            chatData={chatData}
            activeChat={activeChat}
            setChatData={setChatData}
          />
        )}
      </div>
    </>
  );
}

export default ChatPage;
