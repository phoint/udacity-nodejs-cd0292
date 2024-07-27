import { NextFunction, Request, Response } from 'express';
import { resize, imagesDir, thumbDir, search } from './fileHandler';
import path from 'path';

const resizeImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const width = req.query.width as string;
  const height = req.query.height as string;
  const imageName = req.query.name as string;
  console.log(`width: ${width}`);
  console.log(`height: ${height}`);

  try {
    if (!width) {
      throw new Error('Image Not Found');
    }
    if (!imageName) {
      throw new Error('Image name is required!');
    } else {
      const resizedImage = imageName.concat("-thumb.jpg");
      const imagePath = await search(imagesDir, imageName)
      if (imagePath) {
        await resize(
          imagePath,
          path.join(thumbDir, resizedImage),
          parseInt(width),
          parseInt(height),
        );
        req.url = `/${resizedImage}`
        next();
      } else {
        throw new Error("Image Not Found")
      }
    }
  } catch (error) {
    next(error)
  }
};

export default resizeImage;
