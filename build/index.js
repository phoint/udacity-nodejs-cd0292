"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const logger_1 = __importDefault(require("./utilities/logger"));
const app = (0, express_1.default)();
const port = 3000;
// define a route handler for the default home page
app.use('/api', logger_1.default, index_1.default);
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port} `);
});
exports.default = app;
