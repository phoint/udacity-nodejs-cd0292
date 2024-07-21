import { NextFunction, Request, Response } from "express";

const resizeImage = (req: Request, res: Response, next: NextFunction): void => {
    const width = req.query.width
    const height = req.query.height
    if (!width && !height) {
        next()
    }

    
}

export default resizeImage