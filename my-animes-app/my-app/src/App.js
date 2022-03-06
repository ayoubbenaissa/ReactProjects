import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllAnimesAction,
  selectAllAnimes,
} from "./features/animes/animesSlice";

import AnimesList from "./features/animes/AnimesList";

import "./App.css";

function App() {
  const allAnimes = useSelector(selectAllAnimes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAnimesAction());
  }, []);

  return (
    <div className='animes-app'>
      <h2>My Animes App</h2>
      <AnimesList animes={allAnimes} />
    </div>
  );
}

export default App;
