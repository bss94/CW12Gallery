import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GalleryMutation } from "../../types.ts";
import { createGallery } from "./galleriesThunk.ts";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import { selectCreateGallery } from "./galleriesSlice.ts";
import GalleryForm from "./components/GalleryForm.tsx";

const NewGallery = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sending = useAppSelector(selectCreateGallery);

  const onSubmit = async (galleryMutation: GalleryMutation) => {
    try {
      await dispatch(createGallery(galleryMutation)).unwrap();
      navigate("/");
    } catch (error) {}
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography
          component="h1"
          variant="h5"
          textAlign="center"
          sx={{ m: 2 }}
        >
          Create new gallery picture:
        </Typography>
      </Grid>
      <Grid size={12}>
        <GalleryForm sending={sending} onSubmit={onSubmit} />
      </Grid>
    </Grid>
  );
};

export default NewGallery;
