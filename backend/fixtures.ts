import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Gallery from './models/Gallery';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('galleries');
    await db.dropCollection('users');
  } catch (err) {
    console.log('skipping drop');
  }
  const admin = new User({
    email: 'admin@admin.local',
    password: 'admin',
    confirmPassword: 'admin',
    avatar: 'fixtures/admin.jpg',
    displayName: 'Big Boss',
    role: 'admin',
  });
  admin.generateToken();
  await admin.save();
  const user = new User({
    email: 'user@user.local',
    password: 'user',
    confirmPassword: 'user',
    avatar: 'fixtures/user.png',
    displayName: 'test User',
  });
  user.generateToken();
  await user.save();
  await Gallery.create(
    {
      user: admin,
      title: 'Blue Margarita',
      image: 'fixtures/blueMargarita.jpg',
    },
    {
      user: admin,
      title: 'Margarita',
      image: 'fixtures/margarita.jpg',
    },
    {
      user: admin,
      title: 'Tommy Margarita',
      image: 'fixtures/tomy.jpg',
    },
    {
      user: user,
      title: 'Flower',
      image: 'fixtures/flower.jpg',
    },
    {
      user: user,
      title: 'Mountain',
      image: 'fixtures/mountain.jpg',
    },
    {
      user: user,
      title: 'Tiger',
      image: 'fixtures/tiger.jpg',
    },
    {
      user: user,
      title: 'Sunflower',
      image: 'fixtures/sunflower.jpg',
    },
  );
  await db.close();
};

run().catch(console.error);
