import mongoose, { Types } from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const GallerySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    },
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Gallery = mongoose.model('Gallery', GallerySchema);

export default Gallery;
