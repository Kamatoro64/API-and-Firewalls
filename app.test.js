const app = require("./app.js");
const request = require('supertest');
const pool = require("./db");

describe("GET /quotes", () => {
    test("Should respond with a 200 status code", async () => {
        const res = await request(app)
            .get("/quotes")
            .expect(200)
    })
})


describe("POST /quotes", () => {
    describe("Given a quote", () => {
        // should save the quote to the database
        // should respond with a json object containing user id
        // should respond with a 200 status code
        test("should respond with a 200 status code", async () => {
            await request(app)
                .post("/quotes")
                .send({"quote": "To be, or not to be, that is the question"})
                .then(res => {
                    expect(res.statusCode).toBe(200)
                })
        })
        // should specify json in the content type header

    describe("when the quote is missing", () => {
        // should respond with a 400 status code
    })
})
})



afterAll(async () => {
    pool.end();
});
