import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllAnimesAction,
  selectAllAnimes,
} from "./features/animes/animesSlice";

import "./App.css";

function App() {
  const allAnimes = useSelector(selectAllAnimes);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(" ** TEST allAnimes ** ", allAnimes);
  }, []);

  return <div>My Animes App</div>;
}

export default App;
