import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { selectUser, logout, login } from './features/userSlice';

import { auth } from './firebase';
import { useDispatch } from 'react-redux';

import Login from './Login.js';
import Header from './Header/Header';
import SideBar from './Body/SideBar';
import Feed from './Body/Feed';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // user logged in
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL
        }));
      } else {
        dispatch(logout())
      }
    });
  }, []);

  return (
    <div className="app">
      {!user ? (<Login />) : (
        <>
        <Header />
        <div className="app__body">
          <SideBar />
          <Feed />
        </div>
        </>
      )}
    </div>
  );
}

export default App;
