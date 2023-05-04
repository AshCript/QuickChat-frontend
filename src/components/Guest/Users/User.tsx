import React from 'react';
import { MessageService } from '../../../services/MessageService';
import './User.css';

export const User = ({
  user,
  id,
  setMessages,
  cookies,
  setChatUser,
  activeUserId,
  setActiveUserId,
  activeMessageId,
  setActiveMessageId,
}) => {
  const updateChatMessages = () => {
    (async () => {
      try {
        setMessages(
          (await MessageService.getAllUserMessage(cookies.token, user.id)).data
        );
      } catch (error) {
        setMessages([]);
      }
    })();
    setChatUser(user);

    const classes = document.getElementsByClassName('guest-message');
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].getAttribute('id') === id) {
        setActiveMessageId(id);
        classes[i].setAttribute('style', 'background-color: rgb(0, 143, 143)');
      } else {
        classes[i].setAttribute(
          'style',
          'background-color: rgba(10, 10, 10, 0.755)'
        );
      }
    }

    // setSwitchMessageCount(switchMessageCount + 1);
  };

  return (
    <div className="guest-user" onClick={() => updateChatMessages()}>
      {user.firstName} {user.lastName}
    </div>
  );
};
