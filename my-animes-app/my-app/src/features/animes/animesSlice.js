import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAllAnimes, getAnime, updateAnime, deleteAnime } from "./animesAPI";

const initialState = {
  allAnimes: [],
  currentAnime: {},
  allAnimesReady: "loading",
  currentAnimeReady: "loading",
  error: null,
};

export const getAllAnimesAction = createAsyncThunk(
  "animes/getAllAnimes",
  async (_, reject) => {
    try {
      const allAnimes = await getAllAnimes(),
        allAnimesData = allAnimes.json();

      return allAnimesData;
    } catch (err) {
      reject(err.message);
    }
  }
);

export const animesSlice = createSlice({
  name: "animes",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllAnimesAction.pending, (state) => {
        state.allAnimesReady = "loading";
      })
      .addCase(getAllAnimesAction.fulfilled, (state, action) => {
        state.allAnimesReady = "fulfilled";
        state.allAnimes = action.payload;
        state.error = null;
      })
      .addCase(getAllAnimesAction.rejected, (state, action) => {
        state.allAnimesReady = "rejected";
        state.error = action.error.message;
      });
  },
});

export const selectAllAnimes = (state) => state.animes.allAnimes;
