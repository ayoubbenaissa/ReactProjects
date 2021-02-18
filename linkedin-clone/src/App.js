import React from 'react';
import './App.css';

import Header from './Header/Header';
import SideBar from './Body/SideBar';
import Feed from './Body/Feed';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__body">
        <SideBar />
        <Feed />
      </div>
    </div>
  );
}

export default App;
