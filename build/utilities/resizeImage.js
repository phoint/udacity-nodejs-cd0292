"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileHandler_1 = require("./fileHandler");
const path_1 = __importDefault(require("path"));
const resizeImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const width = req.query.width;
    const height = req.query.height;
    const imageName = req.query.name;
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
        }
        else {
            const resizedImage = imageName.concat(`-${width}${height ? 'x'.concat(height) : ''}.jpg`);
            console.log('creating resized image name: ', resizedImage);
            const imagePath = yield (0, fileHandler_1.search)(fileHandler_1.imagesDir, imageName);
            if (imagePath) {
                yield (0, fileHandler_1.resize)(imagePath, path_1.default.join(fileHandler_1.thumbDir, resizedImage), parseInt(width), parseInt(height));
                console.log('Resized successful. Serving image.');
                req.url = `/${resizedImage}`;
                next();
            }
            else {
                console.log('Raw Image Not Found');
                throw new Error('Image Not Found');
            }
        }
    }
    catch (error) {
        console.log('Error while resizing image');
        next(error);
    }
    console.groupEnd();
    console.groupCollapsed('Resize Image');
    console.groupEnd();
});
exports.default = resizeImage;
