import express from "express";

const logger = (req: express.Request, res: express.Response, next: Function): void => {
    let url = req.url;
    console.log(`${url} was visited`)
    console.log(`with request: ${req.body}`)
    console.log(`then response status: ${res.statusCode}`)
    next()
}

export default logger