import express from 'express';
import logger from '../utilities/logger';
import images from './api/images';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('main api route');
});

routes.use("/images", images)

export default routes;
