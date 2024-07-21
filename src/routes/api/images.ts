import express from 'express';
import serveImage from '../../utilities/serveImage';

const images = express.Router();

images.use(
  serveImage,
  express.static('images', {
    redirect: false,
  }),
);

// images.get("/", express.static("images"))

export default images;
