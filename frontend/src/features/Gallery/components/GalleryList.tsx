import React, { useState } from "react";
import { Gallery } from "../../../types.ts";
import Grid from "@mui/material/Grid2";
import { Alert, Grow, Paper } from "@mui/material";
import GalleryItem from "./GalleryItem.tsx";
import GalleryModal from "./GalleryModal.tsx";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  hidePicture,
  selectFullPicture,
  showPicture,
} from "../galleriesSlice.ts";

interface Props {
  galleries: Gallery[];
  canDelete: boolean;
  galleryDelete: (id: string) => void;
}

const GalleryList: React.FC<Props> = ({
  galleries,
  canDelete,
  galleryDelete,
}) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const picture = useAppSelector(selectFullPicture);
  const onOpen = (image: string) => {
    dispatch(showPicture(image));
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    dispatch(hidePicture());
  };

  return (
    <Grid container spacing={2}>
      {galleries.length > 0 ? (
        <>
          {galleries.map((gallery, index) => (
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
                    onOpen={onOpen}
                    canDelete={canDelete}
                    galleryDelete={() => galleryDelete(gallery._id)}
                  />
                </Paper>
              </Grow>
            </Grid>
          ))}
          <GalleryModal image={picture} show={open} onClose={onClose} />
        </>
      ) : (
        <Alert severity="info">Galleries not found!</Alert>
      )}
    </Grid>
  );
};

export default GalleryList;
