import { NotificationProps, NotificationType } from "./notification";
declare module "@flrfinance/react-enotify" {
  export const useNotifications: () => {
    addNotification: (notification: NotificationType) => void;
    removeNotification: (id: string) => void;
  };
  export const NotificationsProvider: React.FC;
  export const Notification: React.FC<NotificationProps>;
}
