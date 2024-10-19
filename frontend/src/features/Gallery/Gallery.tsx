import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../Users/usersSlice.ts";
import { selectFetchGalleries, selectGalleries } from "./galleriesSlice.ts";
import { useEffect } from "react";
import { fetchGalleries } from "./galleriesThunk.ts";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner.tsx";
import GalleryList from "./components/GalleryList.tsx";

const Gallery = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const galleries = useAppSelector(selectGalleries);
  const loading = useAppSelector(selectFetchGalleries);

  useEffect(() => {
    dispatch(fetchGalleries());
  }, [dispatch]);
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Full Gallery
        </Typography>
      </Grid>
      <LoadingSpinner loading={loading} />
      {!loading && <GalleryList galleries={galleries} user={user} />}
    </Grid>
  );
};

export default Gallery;
