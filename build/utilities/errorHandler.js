"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    if (err) {
        res.status(404).send(`Error while serving image:  ${err.message}`);
    }
    next();
};
exports.default = errorHandler;
