import supertest from "supertest";
import app from "../..";
import { imagesDir, resize, thumbDir } from "../../utilities/fileHandler";
import path from "path";
import resizeImage from "../../utilities/resizeImage";
import sharp from "sharp";

const request = supertest(app)

describe("test image service", () => {

    it("should return 404 when missing name parameter", (done) => {
        spyOn(console, 'log')
        request.get("/api/images").expect(404).end((err, res)=>{
            expect(res.text).toEqual("Error while serving image:  Image name is required!")
            done()
        })
    });

    it("should return 404 when image not found", (done) => {
        spyOn(console,'log')
        request.get("/api/images").query({"name": "sampleName"}).expect(404).end((err, res)=> {
            expect(res.text).toEqual("Error while serving image:  Image Not Found")
            done()
        })
    });

    it("should return 200 when image is exist", (done) => {
        spyOn(console, 'log');
        request.get("/api/images").query({"name": "encenadaport"})
        .expect("Content-Type", "/image\/jpeg/")
        .expect(200).end((err, res)=> {
            done()
        })
    });

    it("should return resized image when passing width and height", (done) => {
        spyOn(console, 'log')
        const width = 400;
        const height = 400;
        request.get("/api/images").query({"name": "encenadaport", "width": `${width}`, "height": `${height}`})
        .expect("Content-Type", "/image\/jpeg/")
        .expect(200)
        .end(async (err, res) => {
            const metaData = await sharp(res.body).metadata();
            expect(metaData.width).toBe(width)
            expect(metaData.height).toBe(height)
            done();
        })
    })
})