const app = require("./app.js");
const request = require('supertest');
const pool = require("./db");


console.log(`APP_ENV set to ${process.env.APP_ENV}`)
console.log(`Database settings: ${process.env.DATABASE} on ${process.env.DB_HOST}:${process.env.DB_PORT}`)

describe("GET /quotes", () => {
    test("Should respond with a 200 status code", async () => {
        const res = await request(app)
            .get("/quotes")
            .expect(200)
    })
})


describe("POST /quotes", () => {
    
    describe("Given a quote in JSON format", () => {
        
        test("should respond with a 200 status code", async () => {
            await request(app)
                .post("/quotes")
                .send({"quote": "To be, or not to be, that is the question"})
                .expect(200)
        })
        
        test("should specify json in the content type header", async () => {
            await request(app)
                .post("/quotes")
                .send({"quote": "To be, or not to be, that is the question"})
                .expect('Content-Type', /json/)
        })
        
        test("should respond with quote that was posted", async () => {
            const response = await request(app)
                .post("/quotes")
                .send({"quote": "To be, or not to be, that is the question"})

            expect(response.body.quote).toBe("To be, or not to be, that is the question") 
                
        })

        test("should increase the number of quotes in the database by 1", async () => {
            
            try{
                const initialQuoteCount = await pool.query("SELECT * FROM quotes");
                
            await request(app)
                .post("/quotes")
                .send({"quote": "To be, or not to be, that is the question"})

                const finalQuoteCount = await pool.query("SELECT * FROM quotes");
                
                expect(finalQuoteCount.rows.length).toBe(initialQuoteCount.rows.length + 1) 
            
            } catch (err) {
                console.error(err.message)
            }

                
        })

    })
    
    describe("When the quote is missing", () => {
        // should respond with a 400 status code
        test("should respond with a 400 status code", async () => {
            await request(app)
                .post("/quotes")
                .send()
                .expect(400)
        })
    })
})


// This closes the db pool. Note that const pool = require("./db") loads the same same object
// loaded by app.js Modules are cached after the first time they are loaded.
afterAll(async () => {
    pool.end();
});
