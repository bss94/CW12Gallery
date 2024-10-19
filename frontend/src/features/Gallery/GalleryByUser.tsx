import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../Users/usersSlice.ts";
import { selectFetchGalleries, selectGalleries } from "./galleriesSlice.ts";
import { deleteGallery, fetchGalleries } from "./galleriesThunk.ts";
import Grid from "@mui/material/Grid2";
import { Button, styled, Typography } from "@mui/material";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner.tsx";
import GalleryList from "./components/GalleryList.tsx";
import { Link, useParams } from "react-router-dom";

const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const GalleryByUser = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const galleries = useAppSelector(selectGalleries);
  const loading = useAppSelector(selectFetchGalleries);

  useEffect(() => {
    dispatch(fetchGalleries(id));
  }, [dispatch, id]);

  const galleryDelete = async (galleryId: string) => {
    try {
      await dispatch(deleteGallery(galleryId)).unwrap();
      await dispatch(fetchGalleries(id));
    } catch (error) {}
  };
  return (
    <Grid container spacing={2}>
      <Grid
        size={12}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
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
        {!loading && user?._id === id && (
          <StyledLink to="/gallery-add">
            <Button variant="outlined">add new photo</Button>
          </StyledLink>
        )}
      </Grid>
      <LoadingSpinner loading={loading} />

      {!loading && (
        <Grid size={12}>
          <GalleryList
            galleries={galleries}
            canDelete={user?._id === id || user?.role === "admin"}
            galleryDelete={galleryDelete}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default GalleryByUser;
