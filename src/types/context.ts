import { ReactNode } from "react";
import { NotificationType } from "./notification";
type NotificationsContextType = {
  notifications: NotificationType[];
  addNotification: (notification: NotificationType) => void;
  removeNotification: (id: string) => void;
};

type NotificationsProviderProps = {
  children: ReactNode;
};
export { NotificationsContextType, NotificationsProviderProps };
