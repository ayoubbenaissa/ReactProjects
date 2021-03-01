import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { selectUser } from './features/userSlice';

import Login from './Login.js';
import Header from './Header/Header';
import SideBar from './Body/SideBar';
import Feed from './Body/Feed';

function App() {

  const user = useSelector(selectUser);

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
