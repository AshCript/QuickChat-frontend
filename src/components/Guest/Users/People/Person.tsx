import { AddReactionOutlined, ChatSharp } from '@mui/icons-material';
import React from 'react';
import './Person.css';

export const Person = ({
  person,
  idElement,
  addToContact,
  updateChatMessages,
}) => {
  return (
    <div className="guest-user">
      <div className="guest-user-name">
        {person.firstName} {person.lastName}
      </div>
      <div className="guest-user-buttons">
        <ChatSharp
          className="guest-user-button-chat"
          onClick={() => updateChatMessages(person, idElement)}
          id={idElement}
          style={{ width: '18px', height: '18px' }}
        />
        <AddReactionOutlined
          className="guest-user-button"
          onClick={() => addToContact(person)}
          style={{ width: '18px', height: '18px' }}
        />
      </div>
    </div>
  );
};
