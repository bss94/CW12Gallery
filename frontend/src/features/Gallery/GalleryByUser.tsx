import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../Users/usersSlice.ts";
import { selectFetchGalleries, selectGalleries } from "./galleriesSlice.ts";
import { fetchGalleries } from "./galleriesThunk.ts";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner.tsx";
import GalleryList from "./components/GalleryList.tsx";
import { useParams } from "react-router-dom";

const GalleryByUser = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const galleries = useAppSelector(selectGalleries);
  const loading = useAppSelector(selectFetchGalleries);

  useEffect(() => {
    dispatch(fetchGalleries(id));
  }, [dispatch]);
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        {!loading && galleries.length > 0 && (
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            {galleries[0].user.displayName} Gallery
          </Typography>
        )}
        {!loading && galleries.length === 0 && user?._id === id && (
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            {user?.displayName} Gallery
          </Typography>
        )}
      </Grid>
      <LoadingSpinner loading={loading} />
      <Grid size={12}>
        {!loading && (
          <GalleryList
            galleries={galleries}
            canDelete={user?._id === id || user?.role === "admin"}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default GalleryByUser;
