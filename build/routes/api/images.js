"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serveImage_1 = __importDefault(require("../../utilities/serveImage"));
const resizeImage_1 = __importDefault(require("../../utilities/resizeImage"));
const errorHandler_1 = __importDefault(require("../../utilities/errorHandler"));
const images = express_1.default.Router();
images.use('/', serveImage_1.default, express_1.default.static('images', {
    redirect: false,
    extensions: ['jpg', 'png'],
}));
images.use('/', resizeImage_1.default, express_1.default.static('images/thumb', {
    redirect: false,
    extensions: ['jpg', 'png'],
    fallthrough: false,
}));
images.use(errorHandler_1.default);
exports.default = images;
