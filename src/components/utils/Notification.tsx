import { Close } from '@mui/icons-material';
import React, { useEffect } from 'react';
import './Notification.css';

export const Notification = ({
  setNotification,
  notificationContent,
  setNotificationContent,
}) => {
  useEffect(() => {
    setTimeout(() => {
      setNotification(false);
      setNotificationContent({ message: '', type: '' });
      return 'leaveNotification';
    }, 5000);
  }, []);

  return (
    <div className={'notification notification-' + notificationContent.type}>
      <div>{notificationContent.message}</div>
      <div
        onClick={() => {
          setNotification(false);
          clearTimeout('leaveNotification');
        }}
      >
        <Close
          className={'leave-notification-button'}
          style={{
            width: '12px',
            height: '12px',
            padding: '5px',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
};
