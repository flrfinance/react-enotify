type NotificationButton = {
  label: string;
  onClick: () => void;
};
type NotificationType = {
  id: string;
  title: string;
  description: string;
  status: string;
  dismissible: boolean;
  dismissAfter?: number;
  primaryAction?: NotificationButton;
  secondaryAction?: NotificationButton;
};
type NotificationProps = {
  notification: NotificationType;
  onDismiss: (id: string) => void;
};
export { NotificationType, NotificationButton, NotificationProps };
