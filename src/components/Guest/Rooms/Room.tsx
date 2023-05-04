import React from 'react';
import './Room.css';

export const Room = ({ room }) => {
  return <div className="guestRoom">{room.name}</div>;
};
