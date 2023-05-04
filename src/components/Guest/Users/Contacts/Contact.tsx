import { ChatSharp, Close } from '@mui/icons-material';
import React from 'react';
import './Contact.css';

export const Contact = ({
  contact,
  idElement,
  removeFromContact,
  updateChatMessages,
}) => {
  return (
    <div className="guest-user" id={idElement}>
      <div className="guest-user-name">
        {contact.firstName} {contact.lastName}
      </div>
      <div className="guest-user-buttons">
        <ChatSharp
          className="guest-user-button-chat"
          onClick={() => updateChatMessages(contact, idElement)}
          id={idElement}
          style={{ width: '18px', height: '18px' }}
        />
        <Close
          className="guest-user-button-delete"
          onClick={() => removeFromContact(contact)}
          style={{ width: '18px', height: '18px' }}
        />
      </div>
    </div>
  );
};
