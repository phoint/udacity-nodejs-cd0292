import express from 'express';
import serveImage from '../../utilities/serveImage';
import resizeImage from '../../utilities/resizeImage';
import errorHandler from '../../utilities/errorHandler';

const images = express.Router();

images.use(
  '/',
  serveImage,
  express.static('images', {
    redirect: false,
    extensions: ['jpg', 'png'],
  }),
);
images.use(
  '/',
  resizeImage,
  express.static('images/thumb', {
    redirect: false,
    extensions: ['jpg', 'png'],
    fallthrough: false,
  }),
);
images.use(errorHandler);

export default images;
