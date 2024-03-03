import { useEffect } from "react";
import { useNotificationStore } from "../../Store/notification";
import style from "./Notification.module.css";
import { useNavigate } from "react-router-dom";

function Notification() {
  const { notifications, markAllAsRead, deleteNotifications } =
    useNotificationStore();
  const navigate = useNavigate();

  return (
    <div className={style.notificationsContainer}>
      {notifications.length ? (
        notifications.map((item) => (
          <div
            className={style.notificationMessage}
            onClick={() => {
              navigate(`profile/${item.sender.username}`);
              markAllAsRead();
            }}
            key={item.id}
          >
            {item.message}
          </div>
        ))
      ) : (
        <div className={style.noNotificationHelper}>You have no new notifications</div>
      )}
    </div>
  );
}

export default Notification;
