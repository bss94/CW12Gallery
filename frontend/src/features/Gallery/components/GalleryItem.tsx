import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import { API_URL } from "../../../constants.ts";
import { User } from "../../../types.ts";

interface Props {
  title: string;
  image: string;
  author: string;
  authorId: string;
  user: User | null;
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
  user,
}) => {
  const cardImage = `${API_URL}/${image}`;

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea
        onClick={() => {
          console.log(cardImage);
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
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          textAlign="center"
        >
          By:{author}
        </Typography>
      </CardContent>
      {user && (user.role === "admin" || user._id === authorId) && (
        <CardActions>
          <Button>delete</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default GalleryItem;
