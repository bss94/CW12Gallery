import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import { API_URL } from "../../../constants.ts";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  title: string;
  image: string;
  author: string;
  authorId: string;
  onOpen: (image: string) => void;
  canDelete: boolean;
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: "66.25%",
});

const GalleryItem: React.FC<Props> = ({
  title,
  image,
  author,
  authorId,
  onOpen,
  canDelete,
}) => {
  const cardImage = `${API_URL}/${image}`;

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea
        onClick={() => {
          onOpen(cardImage);
        }}
      >
        <ImageCardMedia image={cardImage} title={title} />
      </CardActionArea>

      <CardContent>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          textAlign="center"
        >
          {title}
        </Typography>
        <Typography variant="body2" component="div" textAlign="center">
          By:<NavLink to={`/gallery_user/${authorId}`}>{author}</NavLink>
        </Typography>
      </CardContent>
      {canDelete && (
        <CardActions sx={{ display: "flex", justifyContent: "end" }}>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default GalleryItem;
