import React from "react";
import { Gallery, User } from "../../../types.ts";
import Grid from "@mui/material/Grid2";
import { Alert, Grow, Paper } from "@mui/material";
import GalleryItem from "./GalleryItem.tsx";

interface Props {
  galleries: Gallery[];
  user: User | null;
}

const GalleryList: React.FC<Props> = ({ galleries, user }) => {
  return (
    <Grid container spacing={2}>
      {galleries.length > 0 ? (
        galleries.map((gallery, index) => (
          <Grid size={3} key={gallery._id}>
            <Grow
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: index * 500 }}
            >
              <Paper elevation={4}>
                <GalleryItem
                  title={gallery.title}
                  image={gallery.image}
                  author={gallery.user.displayName}
                  authorId={gallery.user._id}
                  user={user}
                />
              </Paper>
            </Grow>
          </Grid>
        ))
      ) : (
        <Alert severity="info">Galleries not found!</Alert>
      )}
    </Grid>
  );
};

export default GalleryList;
