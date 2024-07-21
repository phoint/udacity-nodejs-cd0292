import { NextFunction, Request, Response } from 'express';

const serveImage = (req: Request, res: Response, next: NextFunction): void => {
  const imageName = req.query.name as unknown as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  if (!imageName) {
    next();
  }
  if (!width && !height) {
    req.url = `/${imageName?.concat('.jpg')}`;
  } else {
    const thumb = imageName?.concat('-thumb.jpg');
    req.url = `/thumb/${thumb}`;
  }
  next();
};

export default serveImage;
