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
exports.thumbDir = exports.imagesDir = exports.resize = exports.search = void 0;
const util_1 = __importDefault(require("util"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const readdir = util_1.default.promisify(fs_1.default.readdir);
const stat = util_1.default.promisify(fs_1.default.stat);
const imagesDir = path_1.default.join(__dirname, '..', '..', 'images');
exports.imagesDir = imagesDir;
const thumbDir = path_1.default.join(imagesDir, 'thumb');
exports.thumbDir = thumbDir;
const search = (dir, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield readdir(dir);
    for (const file of files) {
        const filePath = path_1.default.join(dir, file);
        const fileStat = yield stat(filePath);
        const index = file.lastIndexOf(fileName);
        if (fileStat.isDirectory()) {
            continue;
        }
        else if (index > -1 && file.charAt(fileName.length) === '.') {
            return filePath;
        }
    }
    return null;
});
exports.search = search;
const resize = (input, output, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const outputFile = yield (0, sharp_1.default)(input)
        .resize(height ? { width: width, height: height, fit: 'fill' } : width)
        .jpeg()
        .toFile(output);
    if (outputFile) {
        return output;
    }
    return null;
});
exports.resize = resize;
