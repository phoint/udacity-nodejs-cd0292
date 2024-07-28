"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serveImage = (req, res, next) => {
    console.group('Serve Image');
    const imageName = req.query.name;
    const width = req.query.width;
    const height = req.query.height;
    console.log('Image name: ', imageName);
    console.log('width: ', width);
    console.log('height: ', height);
    try {
        if (!imageName) {
            console.log('Image name is missing');
            throw new Error('Image name is required!');
        }
        if (!width) {
            console.log('Serving raw image');
            req.url = `/${imageName}`;
        }
        else {
            console.log('Serving resized image');
            const thumbName = imageName.concat(`-${width}${height ? 'x'.concat(height) : ''}.jpg`);
            req.url = `/thumb/${thumbName}`;
        }
        next();
    }
    catch (error) {
        console.log('Error while serving image');
        next(error);
    }
    console.groupEnd();
    console.groupCollapsed('Serve Image');
    console.groupEnd();
};
exports.default = serveImage;
