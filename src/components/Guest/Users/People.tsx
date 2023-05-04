import React, { useEffect, useState } from 'react';
import { ContactService } from '../../../services/ContactService';
import './People.css';
import { Person } from './People/Person';

export const People = ({
  people,
  setUserContacts,
  cookies,
  updateChatMessages,
  setNotification,
  setNotificationContent,
}) => {
  const [isPeopleLoading, setPeopleLoading] = useState(true);

  useEffect(() => {
    if (people.length !== 0) setPeopleLoading(false);
  }, [people]);

  const addToContact = async (person: any) => {
    const response = await ContactService.addUserContact(
      cookies.token,
      cookies.user.id,
      person.id
    );

    // Notification here... (response.message)
    setNotificationContent({
      message: response.message,
      type: 'success',
    });
    setNotification(true);

    setUserContacts(
      (await ContactService.getAllUserContact(cookies.token)).data
    );
  };

  return (
    <div className="people">
      {people.length === 0 ? (
        ''
      ) : (
        <div>
          Chat with other people :<br />
          {!isPeopleLoading
            ? people.map((person: any) => {
                return person !== undefined ? (
                  <Person
                    person={person}
                    key={'person' + person.id}
                    idElement={'person' + person.id}
                    addToContact={addToContact}
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
