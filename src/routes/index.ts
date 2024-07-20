import express from 'express';
import logger from '../utilities/logger';

const routes = express.Router()

routes.get('/', logger, (req, res) => {
    res.send('main api route');
});


export default routes