import { createAsyncThunk } from "@reduxjs/toolkit";
import { Gallery, GalleryMutation } from "../../types.ts";
import axiosApi from "../../axiosApi.ts";
import { RootState } from "../../app/store.ts";

export const fetchGalleries = createAsyncThunk<Gallery[], string | undefined>(
  "gallery/fetchGalleries",
  async (userId) => {
    const { data: galleries } = await axiosApi.get(
      `/gallery${userId ? `?user=${userId}` : ""}`,
    );
    return galleries;
  },
);

export const createGallery = createAsyncThunk<
  void,
  GalleryMutation,
  { state: RootState }
>("gallery/createGallery", async (galleryMutation, { getState }) => {
  const token = getState().users.user?.token;
  const formData = new FormData();
  formData.append("title", galleryMutation.title);
  if (galleryMutation.image) {
    formData.append("image", galleryMutation.image);
  }
  await axiosApi.post("/gallery", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
});

export const deleteGallery = createAsyncThunk<
  void,
  string,
  {
    state: RootState;
  }
>("gallery/deleteGallery", async (galleryId, { getState }) => {
  const token = getState().users.user?.token;
  await axiosApi.delete(`/gallery/${galleryId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
});
