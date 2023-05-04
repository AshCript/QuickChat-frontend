import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from './Home/Login';
import { Register } from './Home/Register';
import './Home.css';

export const Home = ({
  cookies,
  setCookie,
  isSignIn,
  signInRef,
  signUpRef,
}) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      navigate('/guesthome');
    }
    if (isSignIn) {
      signInRef.current.style.backgroundColor = 'rgb(24, 182, 185)';
      signUpRef.current.style.backgroundColor = 'black';
    } else {
      signInRef.current.style.backgroundColor = 'black';
      signUpRef.current.style.backgroundColor = 'rgb(24, 182, 185)';
    }
  }, []);

  return (
    <div>
      <div className="home-image-container"></div>
      <div className="home-container">
        {/* <img
        src="assets/img/circles.jpg"
        alt="image"
        style={{ width: '100%', height: '100%', zIndex: '-1' }}
      /> */}
        <div className="home-container-row">
          <div className="home-container-column">
            {isSignIn ? (
              <Login setCookie={setCookie} />
            ) : (
              <Register setCookie={setCookie} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
