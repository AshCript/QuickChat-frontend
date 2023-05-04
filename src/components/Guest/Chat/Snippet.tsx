import React from 'react';
import './Snippet.css';

export const Snippet = ({ snippet, cookies }) => {
  return (
    <div className="chat-message-container" id={'message' + snippet.id}>
      {snippet.idSender !== cookies.user.id ? (
        <div className="chat-message-wrapper-left">
          <div className="chat-message-left">{snippet.content}</div>
          <div className="chat-date">5 minutes ago</div>
        </div>
      ) : (
        <div className="chat-message-wrapper-right">
          <div className="chat-message-right">{snippet.content}</div>
          <div className="chat-date">5 minutes ago</div>
        </div>
      )}
    </div>
  );
};
