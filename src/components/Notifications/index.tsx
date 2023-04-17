import React from "react";
import { useNotifications } from "../../context/useNotifications";
import Notification from "../Notification";
import { useTransition, animated } from "react-spring";
import { NotificationType } from "../../types/notification"; // Import NotificationType

const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();
  const transitions = useTransition<
    NotificationType,
    { opacity: number; scale: number; translateY: number }
  >(notifications, {
    keys: (item: NotificationType) => item.id,
    from: { opacity: 0, scale: 0.5, translateY: -100 },
    enter: { opacity: 1, scale: 1, translateY: 0 },
    leave: { opacity: 0, scale: 0.5, translateY: 100 },
    update: {}, // Add this line to prevent updates from affecting the transition
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="r-enotification-container">
      {transitions((props, item) => (
        <animated.div
          style={props}
          key={item.id}
          className="r-enotification-cluster"
        >
          <Notification notification={item} onDismiss={removeNotification} />
        </animated.div>
      ))}
    </div>
  );
};

export default Notifications;
