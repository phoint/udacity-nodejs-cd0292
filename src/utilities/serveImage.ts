import { NextFunction, Request, Response } from 'express';
import util from 'util';
import fs from 'fs';
import path from 'path';
import { imagesDir, search, thumbDir } from './fileHandler';

const serveImage = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const imageName = req.query.name as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  try {
    if (!imageName) {
      throw new Error('Image name is required!');
    }
    if (!width) {
        req.url = `/${imageName}`;

    } else {
      const thumbName = imageName.concat("-thumb")
      req.url = `/thumb/${thumbName}`;
    }
    next();
  } catch (error) {
    next(error)
  }
};

export default serveImage;
