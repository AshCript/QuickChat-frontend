import React, { useEffect, useState } from 'react';
import { ContactService } from '../../../services/ContactService';
import { Contact } from './Contacts/Contact';
import './Contacts.css';

export const Contacts = ({
  contacts,
  userContacts,
  setUserContacts,
  cookies,
  updateChatMessages,
  setNotification,
  setNotificationContent,
}) => {
  const [isContactsLoading, setContactsLoading] = useState(true);
  useEffect(() => {
    alert('Contacts mounted!');
  }, []);

  useEffect(() => {
    if (contacts.length !== 0) setContactsLoading(false);
  }, [contacts]);

  /**
   * @description This function remove an userContact, and reload it through the API.
   * @param contact
   */
  const removeFromContact = async (contact: any) => {
    const userContactToDelete = userContacts.find(
      (uc: any) => uc.idFriend === contact.id
    );

    const response = await ContactService.deleteUserContact(
      cookies.token,
      userContactToDelete.id
    );

    // Notification here... (response.message)
    setNotificationContent({
      message: response.message,
      type: 'error',
    });
    setNotification(true);

    setUserContacts(
      (await ContactService.getAllUserContact(cookies.token)).data
    );
  };

  return (
    <div className="contacts">
      All your contacts :<br />
      {contacts.length === 0 ? (
        <span>No contact yet...</span>
      ) : (
        <div>
          {!isContactsLoading
            ? contacts.map((contact: any) => {
                return contact !== undefined ? (
                  <Contact
                    contact={contact}
                    key={'contact' + contact.id}
                    idElement={'contact' + contact.id}
                    removeFromContact={removeFromContact}
                    updateChatMessages={updateChatMessages}
                  />
                ) : (
                  ''
                );
              })
            : 'Loading...'}
        </div>
      )}
    </div>
  );
};
