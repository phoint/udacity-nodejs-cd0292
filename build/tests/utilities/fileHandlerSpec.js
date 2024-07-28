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
const path_1 = __importDefault(require("path"));
const fileHandler_1 = require("../../utilities/fileHandler");
describe('Test Search File', () => {
    it("search should return null when image doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const dir = fileHandler_1.imagesDir;
        const imageName = 'sampleImage';
        const imagePath = yield (0, fileHandler_1.search)(dir, imageName);
        expect(imagePath).toBeNull();
    }));
    it('search should return path when image exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const dir = fileHandler_1.imagesDir;
        const imageName = 'encenadaport';
        const imagePath = yield (0, fileHandler_1.search)(dir, imageName);
        expect(imagePath).not.toBeNull;
        expect(imagePath).toContain(imageName);
        expect(imagePath).toContain(dir);
    }));
});
describe('Test Resize Image', () => {
    const width = 200;
    const height = 200;
    const notExistImage = 'sampleImage.jpg';
    const existImage = 'encenadaport.jpg';
    const resizedName = `encenadaport-${width}x${height}.jpg`;
    const trueInputPath = path_1.default.join(fileHandler_1.imagesDir, existImage);
    const falseInputPath = path_1.default.join(fileHandler_1.imagesDir, notExistImage);
    const output = path_1.default.join(fileHandler_1.thumbDir, resizedName);
    it("resizing should throw error when image doesn't exist", () => {
        expectAsync((0, fileHandler_1.resize)(falseInputPath, output, width, height)).toBeRejected();
    });
    it('resizing should throw error when width is not defined', () => {
        expectAsync((0, fileHandler_1.resize)(trueInputPath, output, undefined, height)).toBeRejected();
    });
    it('resizing should return output path when provide all arguments', () => {
        expectAsync((0, fileHandler_1.resize)(trueInputPath, output, width, height)).toBeResolvedTo(output);
    });
});
