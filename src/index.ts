import express from 'express';
import routes from './routes/index';
import logger from './utilities/logger';

const app = express();
const port = 3000;

// define a route handler for the default home page
app.use(logger)
app.use('/api', routes);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port} `);
});
