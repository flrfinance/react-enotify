import React, { createContext, useContext, useState } from "react";
import Notifications from "../components/Notifications";
import {
  NotificationsContextType,
  NotificationsProviderProps,
} from "../types/context";
import { NotificationType } from "../types/notification";

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
};

const updateNotification = (
  prevNotifications: NotificationType[],
  newNotification: NotificationType
): NotificationType[] => {
  return prevNotifications.map((notification) =>
    notification.id === newNotification.id ? newNotification : notification
  );
};

const addNewNotification = (
  prevNotifications: NotificationType[],
  newNotification: NotificationType
): NotificationType[] => {
  return [newNotification, ...prevNotifications];
};

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState([] as NotificationType[]);
  const addNotification = (notification: NotificationType) => {
    setNotifications((prevNotifications) => {
      const existingNotificationIndex = prevNotifications.findIndex(
        (notif) => notif.id === notification.id
      );

      if (existingNotificationIndex !== -1) {
        return updateNotification(prevNotifications, notification);
      }

      return addNewNotification(prevNotifications, notification);
    });
  };

  const removeNotification = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
      <Notifications />
    </NotificationsContext.Provider>
  );
};
