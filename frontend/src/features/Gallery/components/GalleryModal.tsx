import React from "react";
import { Box, Card, CardMedia, Modal, Typography } from "@mui/material";

interface Props {
  image: string;
  show: boolean;
  onClose: () => void;
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GalleryModal: React.FC<Props> = ({ image, show, onClose }) => {
  return (
    <Modal open={show} onClose={onClose}>
      <Box sx={style}>
        <Card>
          <CardMedia image={image} sx={{ width: "100%", pb: "65%" }} />
        </Card>
      </Box>
    </Modal>
  );
};

export default GalleryModal;
