export interface RegisterMutation {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  avatar: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

interface GalleryUser {
  _id: string;
  displayName: string;
}

export interface Gallery {
  _id: string;
  user: GalleryUser;
  title: string;
  image: string;
}
export interface GalleryMutation {
  title: string;
  image: File | null;
}
