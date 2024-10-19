import { Gallery } from "../../types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createGallery,
  deleteGallery,
  fetchGalleries,
} from "./galleriesThunk.ts";

interface GalleriesState {
  galleries: Gallery[];
  fetchingGalleries: boolean;
  deletingGallery: string | false;
  creatingGallery: boolean;
  fullPicture: string | false;
}

const initialState: GalleriesState = {
  galleries: [],
  fetchingGalleries: false,
  deletingGallery: false,
  creatingGallery: false,
  fullPicture: false,
};

export const galleriesSlice = createSlice({
  name: "galleries",
  initialState,
  reducers: {
    showPicture: (state, { payload: image }: PayloadAction<string>) => {
      state.fullPicture = image;
    },
    hidePicture: (state) => {
      state.fullPicture = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleries.pending, (state) => {
        state.fetchingGalleries = true;
      })
      .addCase(fetchGalleries.fulfilled, (state, { payload: galleries }) => {
        state.galleries = galleries;
        state.fetchingGalleries = false;
      })
      .addCase(fetchGalleries.rejected, (state) => {
        state.fetchingGalleries = false;
      });
    builder
      .addCase(createGallery.pending, (state) => {
        state.creatingGallery = true;
      })
      .addCase(createGallery.fulfilled, (state) => {
        state.creatingGallery = false;
      })
      .addCase(createGallery.rejected, (state) => {
        state.creatingGallery = false;
      });
    builder
      .addCase(deleteGallery.pending, (state, { meta: { arg: id } }) => {
        state.deletingGallery = id;
      })
      .addCase(deleteGallery.fulfilled, (state) => {
        state.deletingGallery = false;
      })
      .addCase(deleteGallery.rejected, (state) => {
        state.deletingGallery = false;
      });
  },
  selectors: {
    selectGalleries: (state) => state.galleries,
    selectFetchGalleries: (state) => state.fetchingGalleries,
    selectDeleteGallery: (state) => state.deletingGallery,
    selectCreateGallery: (state) => state.creatingGallery,
    selectFullPicture: (state) => state.fullPicture,
  },
});

export const galleriesReducer = galleriesSlice.reducer;

export const { showPicture, hidePicture } = galleriesSlice.actions;

export const {
  selectGalleries,
  selectCreateGallery,
  selectFetchGalleries,
  selectDeleteGallery,
  selectFullPicture,
} = galleriesSlice.selectors;
