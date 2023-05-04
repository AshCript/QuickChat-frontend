import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/App/Header';
import { Guest } from './components/Guest';
import { Home } from './components/Home';
import './App.css';

const App = () => {
  const [cookies, setCookie] = useCookies(['token', 'user']);
  const [isSignIn, setSignIn] = useState(true);
  const signInRef: any = useRef();
  const signUpRef: any = useRef();

  useEffect(() => {
    console.log(cookies);
  }, []);
  return (
    <>
      <Router>
        <Header
          cookies={cookies}
          setCookie={setCookie}
          isSignIn={isSignIn}
          setSignIn={setSignIn}
          signInRef={signInRef}
          signUpRef={signUpRef}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cookies={cookies}
                setCookie={setCookie}
                isSignIn={isSignIn}
                signInRef={signInRef}
                signUpRef={signUpRef}
              />
            }
          />
          <Route path="/guesthome" element={<Guest cookies={cookies} />} />
        </Routes>
      </Router>
      {/* <div className="modal-container-row">
        <div className="modal-container-column">
          <div className="modal-header">Create room</div>
          <div className="modal-content">
            <form
            onSubmit={(e) => createRoom(e)}
            >
              <input
                className="guestInput"
                type="text"
                onChange={(e) => setRoomName(e.currentTarget.value)}
                placeholder="Room Name"
              />
              <br />
              <input
                className="guestInput"
                type="text"
                onChange={(e) => setUserId(Number(e.currentTarget.value))}
                placeholder="Your friend ID"
              />
              <br />
              <input
                className="guestSubmit"
                type="submit"
                value="Create Room"
              />
            </form>
          </div>
          <div></div>
          <div></div>
        </div>
      </div> */}
    </>
  );
};
export default App;
