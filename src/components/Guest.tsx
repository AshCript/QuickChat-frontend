import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageService } from '../services/MessageService';
import { UserService } from '../services/UserService';
import { Chat } from './Guest/Chat';
import { Messages } from './Guest/Messages';
import { Users } from './Guest/Users';
import { Notification } from './utils/Notification';
import './Guest.css';

export const Guest = ({ cookies }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const [chatUser, setChatUser] = useState({});

  const [isModal, setModal] = useState(false);
  const [isNotification, setNotification] = useState(false);
  const [notificationContent, setNotificationContent] = useState({
    message: '',
    type: '',
  });
  const [blurFilter, setBlurFilter] = useState({ filter: 'blur(0px)' });

  const [activeMessageId, setActiveMessageId] = useState('');

  useEffect(() => {
    if (cookies.token) {
      (async () => {
        setUsers((await UserService.getAllUsers(cookies.token)).data);
      })();
      setNotificationContent({
        message: 'You are logged in! 😊',
        type: 'success',
      });
      setNotification(true);
    }
  }, []);

  useEffect(() => {
    if (cookies.token) {
      (async () => {
        const lastMessageUsers: any[] = (
          await MessageService.getLastUserMessages(cookies.token)
        ).data;
        lastMessageUsers.sort((a, b) => b.id - a.id);
        setLastMessages(lastMessageUsers);
      })();
    }
  }, [users, messages]);

  useEffect(() => {
    const classes = document.getElementsByClassName('guest-message');
    const chatUserHere: any = chatUser;
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].getAttribute('id') === 'message' + chatUserHere.id) {
        setActiveMessageId('message' + chatUserHere.id);
        classes[i].setAttribute('style', 'background-color: rgb(0, 143, 143)');
      } else {
        classes[i].setAttribute(
          'style',
          'background-color: rgba(10, 10, 10, 0.755)'
        );
      }
    }
  }, [lastMessages]);

  return (
    <>
      {cookies.token ? (
        <div className="guestContent" style={blurFilter}>
          <Messages
            setBlurFilter={setBlurFilter}
            setModal={setModal}
            users={users}
            cookies={cookies}
            lastMessages={lastMessages}
            setMessages={setMessages}
            setChatUser={setChatUser}
            activeMessageId={activeMessageId}
            setActiveMessageId={setActiveMessageId}
          />
          <Chat
            messages={messages}
            setMessages={setMessages}
            setBlurFilter={setBlurFilter}
            setModal={setModal}
            cookies={cookies}
            chatUser={chatUser}
            setChatUser={setChatUser}
            setActiveMessageId={setActiveMessageId}
          />
          <Users
            cookies={cookies}
            users={users}
            setMessages={setMessages}
            setChatUser={setChatUser}
            setActiveMessageId={setActiveMessageId}
            setNotification={setNotification}
            setNotificationContent={setNotificationContent}
          />
        </div>
      ) : (
        <Link to="/">Please connect first.</Link>
      )}
      {/* {isModal ? (
        <div className="modal-container-row">
          <div className="modal-container-column">
            <div
              className="modal-exit-button"
              onClick={() => {
                setModal(false);
                setBlurFilter({ filter: 'blur(0px)' });
              }}
            >
              X
            </div>
            <div className="modal-header">Create room</div>
            <div className="modal-content">
              <form onSubmit={(e) => createMessage(e)}>
                <input
                  className="guestInput"
                  type="text"
                  onChange={(e) => setRoomName(e.currentTarget.value)}
                  placeholder="Room Name"
                  value={roomName}
                />
                <br />
                <input
                  className="guestInput"
                  type="text"
                  onChange={(e) => setUserId(Number(e.currentTarget.value))}
                  placeholder="Your friend ID"
                  value={Number.isNaN(userId) || userId === 0 ? '' : userId}
                />
                <br />
                <input
                  className="guestSubmit"
                  type="submit"
                  value="Create Room"
                />
              </form>
            </div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        ''
      )} */}
      {isNotification ? (
        <Notification
          setNotification={setNotification}
          notificationContent={notificationContent}
          setNotificationContent={setNotificationContent}
        />
      ) : (
        ''
      )}
    </>
  );
};
