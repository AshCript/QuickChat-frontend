import React from 'react';
import { Message } from './Messages/Message';
import './Messages.css';

export const Messages = ({
  setBlurFilter,
  setModal,
  users,
  cookies,
  lastMessages,
  setMessages,
  setChatUser,
  activeMessageId,
  setActiveMessageId,
}) => {
  return (
    <div className="guest-messages">
      All your messages : <br />
      {lastMessages.map((lastMessage: any) => {
        const user = users.find(
          (user: any) =>
            user.id !== cookies.user.id &&
            (user.id === lastMessage.idSender ||
              user.id === lastMessage.idReceiver)
        );
        return (
          <Message
            user={user}
            lastMessage={lastMessage}
            key={'message' + lastMessage.id}
            setMessages={setMessages}
            cookies={cookies}
            idElement={'message' + user.id}
            activeMessageId={activeMessageId}
            setActiveMessageId={setActiveMessageId}
            setChatUser={setChatUser}
          />
        );
      })}
    </div>
  );
};
