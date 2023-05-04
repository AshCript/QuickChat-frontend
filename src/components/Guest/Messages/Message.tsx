import React from 'react';
import { MessageService } from '../../../services/MessageService';
import './Message.css';

export const Message = ({
  user,
  lastMessage,
  setMessages,
  cookies,
  idElement,
  activeMessageId,
  setActiveMessageId,
  setChatUser,
}) => {
  const updateChatMessages = () => {
    (async () => {
      setMessages(
        (await MessageService.getAllUserMessage(cookies.token, user.id)).data
      );
    })();
    setChatUser(user);

    // Holding on the current active user message in the message list.
    const classes = document.getElementsByClassName('guest-message');
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].getAttribute('id') === idElement) {
        setActiveMessageId(idElement);
        classes[i].setAttribute('style', 'background-color: rgb(0, 143, 143)');
      } else {
        classes[i].setAttribute(
          'style',
          'background-color: rgba(10, 10, 10, 0.755)'
        );
      }
    }
  };

  return (
    <div
      className="guest-message"
      onClick={() => updateChatMessages()}
      id={idElement}
      onMouseOver={() => {
        document.getElementById(idElement).style.backgroundColor =
          'rgb(0, 143, 143)';
      }}
      onMouseOut={(e) => {
        if (activeMessageId !== idElement)
          document.getElementById(idElement).style.backgroundColor =
            'rgba(10, 10, 10, 0.755)';
      }}
    >
      <div className="guest-message-title">
        {user ? `${user.firstName} ${user.lastName}` : 'Unknown user'}
      </div>
      <div className="guest-message-content">
        {lastMessage.content} {lastMessage.createdAt}
      </div>
    </div>
  );
};
