import React from "react";
import { useNotifications } from "../../context/useNotifications";
import Notification from "../Notification";
import {
  useTransition,
  animated,
  SpringValue,
  AnimatedProps,
} from "react-spring";
import { NotificationType } from "../../types/notification";
import { HTMLAttributes } from "react";

// ✅ Extend AnimatedProps to allow children explicitly
type AnimatedDivWithChildren = AnimatedProps<HTMLAttributes<HTMLDivElement>> & {
  children?: React.ReactNode;
};

const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  const transitions = useTransition<
    NotificationType,
    {
      opacity: SpringValue<number>;
      scale: SpringValue<number>;
      translateY: SpringValue<number>;
    }
  >(notifications, {
    keys: (item) => item.id,
    from: { opacity: 0, scale: 0.5, translateY: -100 },
    enter: { opacity: 1, scale: 1, translateY: 0 },
    leave: { opacity: 0, scale: 0.5, translateY: 100 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="r-enotification-container">
      {transitions((style, item) => {
        const props: AnimatedDivWithChildren = {
          style,
          className: "r-enotification-cluster",
          children: (
            <Notification notification={item} onDismiss={removeNotification} />
          ),
        };

        return <animated.div key={item.id} {...props} />;
      })}
    </div>
  );
};

export default Notifications;
