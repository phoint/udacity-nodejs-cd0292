import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err) {
    res.status(404).send(`Error while serving image:  ${err.message}`);
  }
  next();
};
export default errorHandler;
