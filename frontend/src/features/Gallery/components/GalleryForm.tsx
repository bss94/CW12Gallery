import React, { useState } from "react";
import { GalleryMutation } from "../../../types.ts";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";
import FileInput from "../../../UI/FileInput/FileInput.tsx";
import { LoadingButton } from "@mui/lab";

interface Props {
  sending: boolean;
  onSubmit: (galleryMutation: GalleryMutation) => void;
}

const GalleryForm: React.FC<Props> = ({ sending, onSubmit }) => {
  const [state, setState] = useState<GalleryMutation>({
    title: "",
    image: null,
  });
  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      component="form"
      onSubmit={submitFormHandler}
    >
      <Grid>
        <TextField
          required
          fullWidth
          label="Title"
          name="title"
          id="title"
          value={state.title}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <FileInput
          label="Image"
          name="image"
          required={true}
          onChange={fileInputChangeHandler}
        />
      </Grid>
      <Grid>
        <LoadingButton
          type="submit"
          loading={sending}
          loadingPosition="center"
          variant="contained"
        >
          <span>Send</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default GalleryForm;
