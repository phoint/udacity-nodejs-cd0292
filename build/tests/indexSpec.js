"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('test main route', () => {
    it('get /api OK', (done) => {
        spyOn(console, 'log');
        request
            .get('/api')
            .expect(200)
            .end((err, res) => {
            expect(res.text).toEqual('main api route');
            done();
        });
    });
});
