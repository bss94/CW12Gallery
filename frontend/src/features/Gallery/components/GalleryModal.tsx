import React from "react";
import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  image: string | false;
  show: boolean;
  onClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  px: 4,
  pb: 4,
  textAlign: "end",
};

const GalleryModal: React.FC<Props> = ({ image, show, onClose }) => {
  return (
    image && (
      <Modal open={show} onClose={onClose}>
        <Box sx={style}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <img src={image} style={{ width: "100%" }} alt={"some image"} />
        </Box>
      </Modal>
    )
  );
};

export default GalleryModal;
