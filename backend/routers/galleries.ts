import express from 'express';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import Gallery from '../models/Gallery';

const galleriesRouter = express.Router();

galleriesRouter.get('/', async (req, res, next) => {
  try {
    const userId = req.query.user;
    const galleries = await Gallery.find(userId ? { user: userId } : {}).populate('user', 'displayName');
    return res.send(galleries);
  } catch (err) {
    next(err);
  }
});

galleriesRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    if (req.user) {
      const galleryMutation = {
        user: req.user._id,
        title: req.body.title,
        image: req.file ? req.file.filename : null,
      };
      const newGallery = new Gallery(galleryMutation);
      await newGallery.save();
      return res.send(newGallery);
    }
    return res.status(403).send({ error: 'Unauthorized' });
  } catch (err) {
    next(err);
  }
});

galleriesRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const galleryId = req.params.id;
    if (req.user) {
      const galleryToDelete = await Gallery.findById(galleryId);
      if (!galleryToDelete) return res.status(404).send({ error: 'Gallery not found' });
      if (req.user.role === 'admin' || req.user._id === galleryToDelete.user._id) {
        await galleryToDelete.deleteOne();
        return res.status(200).send({ deleted: true });
      }
      return res.status(403).send({ error: 'Unauthorized' });
    }
    return res.status(403).send({ error: 'Unauthorized' });
  } catch (error) {
    next(error);
  }
});

export default galleriesRouter;
