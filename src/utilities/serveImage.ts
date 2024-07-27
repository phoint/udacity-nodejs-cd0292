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
  console.group("Serve Image")
  const imageName = req.query.name as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  console.log("Image name: ", imageName)
  console.log("width: ", width)
  console.log("height: ", height)

  try {
    if (!imageName) {
      console.log("Image name is missing")
      throw new Error('Image name is required!');
    }
    if (!width) {
      console.log("Serving raw image")
      req.url = `/${imageName}`;
    } else {
      console.log("Serving resized image")
      const thumbName = imageName.concat(`-${width}${height?'x'.concat(height):''}.jpg`)
      req.url = `/thumb/${thumbName}`;
    }
    next();
  } catch (error) {
    console.error("Error while serving image")
    next(error)
  }
  console.groupEnd()
  console.groupCollapsed("Serve Image")
  console.groupEnd()
};

export default serveImage;
