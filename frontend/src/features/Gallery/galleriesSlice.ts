import { Gallery } from "../../types.ts";
import { createSlice } from "@reduxjs/toolkit";

interface GalleriesState {
  galleries: Gallery[];
  fetchGalleries: boolean;
  deleteGallery: string | false;
}

const initialState: GalleriesState = {
  galleries: [],
  fetchGalleries: false,
  deleteGallery: false,
};

export const galleriesSlice = createSlice({
  name: "galleries",
  initialState,
  reducers: {},
  extraReducers: () => {},
  selectors: {
    selectGalleries: (state) => state.galleries,
    selectFetchGalleries: (state) => state.fetchGalleries,
    selectDeleteGallery: (state) => state.deleteGallery,
  },
});

export const galleriesReducer = galleriesSlice.reducer;

export const { selectGalleries, selectFetchGalleries, selectDeleteGallery } =
  galleriesSlice.selectors;
