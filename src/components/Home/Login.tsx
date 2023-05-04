import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services/UserService';

export const Login = ({ setCookie }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await UserService.getUserByLogin(login, password);
      setCookie('token', response.token, {
        path: '/',
        // SameSite: 'none',
      });
      setCookie('user', response.data, {
        path: '/',
        // SameSite: 'none',
      });

      // Notification here (response.message)
      // alert(response.message);

      navigate('/guesthome');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={(e) => sendData(e)}>
      <div>
        <input
          className="form-text"
          type="text"
          name="login"
          placeholder="Email address..."
          id="login"
          onChange={(e) => setLogin(e.currentTarget.value)}
        />
        <input
          className="form-text"
          type="password"
          name="password"
          placeholder="Password..."
          id="password"
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <div className="form-button-container">
          <input className="form-button" type="submit" value="Login" />
        </div>
      </div>
    </form>
  );
};
