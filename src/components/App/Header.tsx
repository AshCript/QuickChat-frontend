import { ExitToAppRounded, MessageOutlined } from '@mui/icons-material';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export const Header = ({
  cookies,
  setCookie,
  isSignIn,
  setSignIn,
  signInRef,
  signUpRef,
}) => {
  let navigate = useNavigate();

  const leaveApp = () => {
    setCookie('token', '', {
      path: '/',
      // SameSite: 'none',
    });
    setCookie(
      'user',
      {},
      {
        path: '/',
        // SameSite: 'none',
      }
    );
    navigate('/');
  };

  const switchActiveButton = (flag: boolean) => {
    setSignIn(flag);
    if (flag) {
      signInRef.current.style.backgroundColor = 'rgb(24, 182, 185)';
      signUpRef.current.style.backgroundColor = 'black';
    } else {
      signInRef.current.style.backgroundColor = 'black';
      signUpRef.current.style.backgroundColor = 'rgb(24, 182, 185)';
    }
  };

  const activeOverButton = (reference: any) => {
    if (
      (reference === signInRef && isSignIn) ||
      (reference === signUpRef && !isSignIn)
    ) {
      reference.current.style.backgroundColor = 'rgb(24, 182, 185)';
    } else {
      reference.current.style.backgroundColor = 'rgb(24, 182, 185)';
    }
  };
  const desactiveOverButton = (reference: any) => {
    if (
      (reference === signInRef && isSignIn) ||
      (reference === signUpRef && !isSignIn)
    ) {
      reference.current.style.backgroundColor = 'rgb(24, 182, 185)';
    } else {
      reference.current.style.backgroundColor = 'black';
    }
  };

  return (
    <div className="header">
      <div className="header-logo">
        QuickChat
        <MessageOutlined
          style={{ position: 'absolute', width: '12px', height: 'inherit' }}
        />
      </div>
      {cookies.token ? (
        <div className="header-exit-button">
          <ExitToAppRounded
            className="header-exit-button-icon"
            onClick={() => leaveApp()}
          />
        </div>
      ) : (
        <div className="header-sign-buttons">
          <div className="header-sign-buttons-container">
            <div
              className="header-signin-button"
              onClick={() => {
                switchActiveButton(true);
              }}
              onMouseOver={() => {
                activeOverButton(signInRef);
              }}
              onMouseOut={() => {
                desactiveOverButton(signInRef);
              }}
              ref={signInRef}
            >
              Sign in
            </div>
            <div
              className="header-signup-button"
              onClick={() => switchActiveButton(false)}
              onMouseOver={() => {
                activeOverButton(signUpRef);
              }}
              onMouseOut={() => {
                desactiveOverButton(signUpRef);
              }}
              ref={signUpRef}
            >
              Sign up
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
