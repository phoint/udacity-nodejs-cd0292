"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, res, next) => {
    const url = req.url;
    console.group(`${url}`);
    console.log(`${url} was visited`);
    console.log(`with request: ${req.body}`);
    console.log(`with query params: ${JSON.stringify(req.query)}`);
    console.log(`then response status: ${res.statusCode}`);
    console.groupEnd();
    console.groupCollapsed(`${url}`);
    console.groupEnd();
    next();
};
exports.default = logger;
