const app = require("./app.js");
const request = require('supertest');
const pool = require("./db");

// Test configuration checks
describe(`Check test parameters`, () => {
    test("APP_ENV should be set to test (.env.test is in effect)", () =>{
        expect(process.env.APP_ENV).toBe("test")
    })
    test("DB_HOST should be set to localhost", () =>{
        expect(process.env.DB_HOST).toBe("localhost")
    })
    test("DB_PORT should be set to 1234 (port bounded to the postgresql port in the docker container)", () =>{
        expect(process.env.DB_PORT).toBe("1234")
    })
})

// Create a Javascript object to be passed to the tests to avoid duplication
const testQuote = {quote: "To be, or not to be, that is the question"}




describe("POST /quotes", () => {
    
    describe("Given a quote in JSON format", () => {
        
        test("should respond with a 200 status code", async () => {
            await request(app)
                .post("/quotes")
                .send(testQuote)
                .expect(200)
        })
        
        test("should specify json in the content type header", async () => {
            await request(app)
                .post("/quotes")
                .send(testQuote)
                .expect('Content-Type', /json/)
        })
        
        test("should respond with quote that was posted", async () => {
            const response = await request(app)
                .post("/quotes")
                .send(testQuote)

            expect(response.body.quote).toBe(testQuote.quote) 
                
        })

        test("should increase the number of quotes in the database by 1", async () => {
            
            try{
                const currentQuotes = await pool.query("SELECT * FROM quotes");
                
            await request(app)
                .post("/quotes")
                .send(testQuote)

                const updatedQuotes = await pool.query("SELECT * FROM quotes");

                expect(updatedQuotes.rows.length).toBe(currentQuotes.rows.length + 1) 
            
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


describe("GET /quotes", () => {
    test("Should respond with a 200 status code", async () => {
        const res = await request(app)
            .get("/quotes")
            .expect(200)
    })
    
    test("should specify json in the content type header", async () => {
        await request(app)
            .get("/quotes")
            .expect('Content-Type', /json/)
    })
    
    test("should return same number of quotes as number of quotes in the database", async () => {
        try{
            const dbCount = await pool.query("SELECT * FROM quotes")
                .then(result => result.rows.length)

            const responseCount = await request(app)
                .get("/quotes")
                .then(res => res.body.length)
            
            expect(responseCount).toBe(dbCount)
        
        } catch(err){
            console.error(err.message)
        }

    })
})
// This closes the db pool. Note that const pool = require("./db") loads the same same object
// loaded by app.js Modules are cached after the first time they are loaded.
afterAll(async () => {
    pool.end();
});
