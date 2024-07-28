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
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require("../.."));
const sharp_1 = __importDefault(require("sharp"));
const request = (0, supertest_1.default)(__1.default);
describe('test image service', () => {
    it('should return 404 when missing name parameter', (done) => {
        spyOn(console, 'log');
        request
            .get('/api/images')
            .expect(404)
            .end((err, res) => {
            expect(res.text).toEqual('Error while serving image:  Image name is required!');
            done();
        });
    });
    it('should return 404 when image not found', (done) => {
        spyOn(console, 'log');
        request
            .get('/api/images')
            .query({ name: 'sampleName' })
            .expect(404)
            .end((err, res) => {
            expect(res.text).toEqual('Error while serving image:  Image Not Found');
            done();
        });
    });
    it('should return 200 when image is exist', (done) => {
        spyOn(console, 'log');
        request
            .get('/api/images')
            .query({ name: 'encenadaport' })
            .expect('Content-Type', '/image/jpeg/')
            .expect(200)
            .end(() => {
            done();
        });
    });
    it('should return resized image when passing width and height', (done) => {
        spyOn(console, 'log');
        const width = 400;
        const height = 400;
        request
            .get('/api/images')
            .query({ name: 'encenadaport', width: `${width}`, height: `${height}` })
            .expect('Content-Type', '/image/jpeg/')
            .expect(200)
            .end((err, res) => __awaiter(void 0, void 0, void 0, function* () {
            const metaData = yield (0, sharp_1.default)(res.body).metadata();
            expect(metaData.width).toBe(width);
            expect(metaData.height).toBe(height);
            done();
        }));
    });
});
