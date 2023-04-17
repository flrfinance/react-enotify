import React, { useEffect } from "react";
import Checkmark from "./Checkmark";
import Info from "./Info";
import Warning from "./Warning";
import Error from "./Error";
import { NotificationProps } from "../../types/notification";

const Notification: React.FC<NotificationProps> = ({
  notification,
  onDismiss,
}) => {
  const {
    id,
    title,
    description,
    status,
    dismissible,
    dismissAfter,
    primaryAction,
    secondaryAction,
  } = notification;
  useEffect(() => {
    if (dismissible && dismissAfter && dismissAfter > 0) {
      const timer = setTimeout(() => onDismiss(id), dismissAfter);
      return () => clearTimeout(timer);
    } else {
      return;
    }
  }, [dismissAfter]);
  return (
    <div className={`r-enotification ${status}`}>
      <div className='r-enotifications-loading-wrapper'>
        {status === "loading" && (
          <span className='r-enotification-loader'></span>
        )}
        {status === "success" && <Checkmark />}
        {status === "info" && <Info />}
        {status === "warning" && <Warning />}
        {status === "error" && <Error />}
      </div>
      <div className='r-enotification-content'>
        <p className='r-enotification-title'>
          <strong>{title}</strong>
        </p>
        <p className='r-enotification-description'>
          <small>{description}</small>
        </p>
      </div>
      <div className='r-enotification-actions'>
        {primaryAction && (
          <button
            className='r-enotification-action primary'
            onClick={primaryAction.onClick}
          >
            {primaryAction.label}
          </button>
        )}
        {secondaryAction && (
          <button
            className='r-enotification-action secondary'
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(Notification);
