import { ExitToAppRounded } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import { scroller } from 'react-scroll';
import { MessageService } from '../../services/MessageService';
import { Snippet } from './Chat/Snippet';
import './Chat.css';

export const Chat = ({
  messages,
  setMessages,
  setBlurFilter,
  setModal,
  cookies,
  chatUser,
  setChatUser,
  setActiveMessageId,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isMessagesLoading, setMessagesLoading] = useState(true);

  useEffect(() => {
    setMessagesLoading(true);
  }, [chatUser]);
  useEffect(() => {
    setMessagesLoading(false);
  }, [messages, chatUser]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cookies.token) {
      (async () => {
        const response = await MessageService.createMessage(
          cookies.token,
          chatUser.id,
          newMessage
        );
        const newMsg = response.data;

        // Notification here... (response.message)

        setMessages([...messages, newMsg]);
      })();
      scroller.scrollTo(`bottom-chat`, {
        containerId: `chat`,
        smooth: true,
        duration: 1000,
        offset: -70,
        spy: true,
      });
    }
    setNewMessage('');
  };

  const leaveChat = () => {
    setActiveMessageId('');
    setChatUser({});
    setMessages([]);
    const classes: any = document.getElementsByClassName('guest-message');
    classes.forEach((c: HTMLElement) => {
      c.setAttribute('style', 'background-color: rgba(10, 10, 10, 0.755)');
    });
  };

  return (
    <div className="chat" id="chat">
      {chatUser.id ? (
        <>
          <div className="chat-header-container">
            <div className="chat-header">
              <ExitToAppRounded
                className="chat-exit-button"
                onClick={() => leaveChat()}
              />
              <div>
                {chatUser.firstName} {chatUser.lastName}
              </div>
            </div>
          </div>

          <div className="chat-container" id="chat-container">
            {!isMessagesLoading
              ? messages.map((snippet: any) => {
                  return (
                    <Snippet
                      snippet={snippet}
                      cookies={cookies}
                      key={'snippet' + snippet.id}
                    />
                  );
                })
              : 'Loading...'}
            <ScrollToBottom messages={messages} />

            <form
              onSubmit={(e) => sendMessage(e)}
              className="chat-form-message"
            >
              <input
                className="chat-form-message-input"
                type="text"
                name="content"
                id=""
                onChange={(e) => setNewMessage(e.currentTarget.value)}
                value={newMessage}
                placeholder="Write a message..."
              />
              <button className="chat-form-message-button">&gt;</button>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="chat-welcome-message-column">
            <div className="chat-welcome-message-row">
              <div>Select a person to begin chat.</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/**
 * @description It only scrolls to the bottom of the message when the component containing all messages are loaded.
 * @param messages a state that contains all messages between the current user and the clicked [message | contact | person] in the list
 */
const ScrollToBottom = ({ messages }) => {
  const elementRef: any = useRef();
  useEffect(() => {
    elementRef.current.scrollIntoView();
  }, [messages]);

  return <div ref={elementRef} id="bottom-chat" />;
};
