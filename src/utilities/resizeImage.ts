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
  console.group('Resize Image');
  console.log(`width: ${width}`);
  console.log(`height: ${height}`);

  try {
    if (!width) {
      console.log('width is missing, origin Image Not Found');
      throw new Error('Image Not Found');
    }
    if (!imageName) {
      console.log('Image name is missing');
      throw new Error('Image name is required!');
    } else {
      const resizedImage = imageName.concat(
        `-${width}${height ? 'x'.concat(height) : ''}.jpg`,
      );
      console.log('creating resized image name: ', resizedImage);
      const imagePath = await search(imagesDir, imageName);
      if (imagePath) {
        await resize(
          imagePath,
          path.join(thumbDir, resizedImage),
          parseInt(width),
          parseInt(height),
        );
        console.log('Resized successful. Serving image.');
        req.url = `/${resizedImage}`;
        next();
      } else {
        console.log('Raw Image Not Found');
        throw new Error('Image Not Found');
      }
    }
  } catch (error) {
    console.log('Error while resizing image');
    next(error);
  }
  console.groupEnd();
  console.groupCollapsed('Resize Image');
  console.groupEnd();
};

export default resizeImage;
