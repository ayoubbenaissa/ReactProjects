import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import animesReducer from "../features/animes/animesSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    animes: animesReducer,
  },
});
