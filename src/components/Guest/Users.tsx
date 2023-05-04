import React, { useEffect, useState } from 'react';
import { ContactService } from '../../services/ContactService';
import { MessageService } from '../../services/MessageService';
import { Contacts } from './Users/Contacts';
import { People } from './Users/People';
import './Users.css';

export const Users = ({
  cookies,
  users,
  setMessages,
  setChatUser,
  setActiveMessageId,
  setNotification,
  setNotificationContent,
}) => {
  /**
   * @description It contains userContacts states, which loads all the data about the current user and all its contacts from the database through the API. So it just contains the foreign keys between the the two relations : User and Contact.
   *
   */
  const [userContacts, setUserContacts] = useState([]);

  /**
   * @description It contains contacts states, which is fully handled from here, in the frontend. Once all the Users and the UserContacts data loaded, it tries to get all the users with the id equals to the userContact's idFriend property.
   */
  const [contacts, setContacts] = useState([]);

  /**
   * @description It contains other people states, i.e. all the users which is not in contacts' state.
   */
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (cookies.token) {
      (async () => {
        const response = await ContactService.getAllUserContact(cookies.token);
        setUserContacts(response.data);
        // Notification state here for later... (response.message)
      })();
    }
  }, []);

  useEffect(() => {
    setContacts([]);
    if (!!userContacts) {
      let newContacts: any[] = [];

      userContacts.map((uc) => {
        const contactFound = users.find((user) => {
          if (user.id === uc.idFriend) return user;
        });
        if (!!contactFound) {
          newContacts.push(contactFound);
        }
      });
      setContacts(newContacts);
    }
  }, [userContacts, users]);

  useEffect(() => {
    setPeople([]);
    setPeople(
      users.filter(
        (user: any) => !contacts.includes(user) && user.id !== cookies.user.id
      )
    );
  }, [contacts]);

  const updateChatMessages = (user: any, idElement: string) => {
    (async () => {
      try {
        const response = await MessageService.getAllUserMessage(
          cookies.token,
          user.id
        );
        setMessages(response.data);
        // Notification state here for later... (response.message)
      } catch (error) {
        setMessages([]);
      }
    })();
    setChatUser(user);
    const classes = document.getElementsByClassName('guest-message');
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].getAttribute('id') === 'message' + user.id) {
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
    <div className="users">
      <Contacts
        contacts={contacts}
        userContacts={userContacts}
        setUserContacts={setUserContacts}
        cookies={cookies}
        updateChatMessages={updateChatMessages}
        setNotification={setNotification}
        setNotificationContent={setNotificationContent}
      />
      <People
        people={people}
        setUserContacts={setUserContacts}
        cookies={cookies}
        updateChatMessages={updateChatMessages}
        setNotification={setNotification}
        setNotificationContent={setNotificationContent}
      />
    </div>
  );
};
