import React, { useState } from 'react';
import { UserService } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

export const Register = ({ setCookie }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  let navigate = useNavigate();

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = {
        firstName,
        lastName,
        email,
        phone,
        password,
      };
      const registerResponse = await UserService.addUser(userData);

      const response = await UserService.getUserByLogin(email, password);
      setCookie('token', response.token, {
        path: '/',
        // SameSite: 'none',
      });
      setCookie('user', response.data, {
        path: '/',
        // SameSite: 'none',
      });

      // Notification here (response.message)
      alert(registerResponse.message);

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
          name="First Name"
          placeholder="First Name"
          id=""
          value={firstName}
          onChange={(e) => setFirstName(e.currentTarget.value)}
        />
        <input
          className="form-text"
          type="text"
          name="Last Name"
          placeholder="Last Name"
          id=""
          value={lastName}
          onChange={(e) => setLastName(e.currentTarget.value)}
        />
        <input
          className="form-text"
          type="email"
          name="Email address"
          placeholder="Email address"
          id=""
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </div>
      <div>
        <input
          className="form-text"
          type="text"
          name="Phone number"
          placeholder="Phone number"
          id=""
          value={phone}
          onChange={(e) => setPhone(e.currentTarget.value)}
        />
        <input
          className="form-text"
          type="password"
          name="Password"
          placeholder="Password"
          id=""
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input
          className="form-text"
          type="password"
          name="Confirm password"
          placeholder="Confirm password"
          id=""
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />
        <div className="form-button-container">
          <input className="form-button" type="submit" value="Register" />
        </div>
      </div>
    </form>
  );
};
