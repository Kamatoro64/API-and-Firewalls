const express = require('express');
//const morgan = require('morgan');
const app = express();
const pool = require("./db");

//app.use(morgan('combined'));
app.use(express.json()) // => req.body

// Routes //
// Get all quotes
app.get("/quotes", async(req, res)=>{
    try{
    
        const allQuotes = await pool.query(
            "SELECT * FROM quotes"
        ); 
        
        res.json(allQuotes.rows);
    
    } catch (err) {
        console.error(err.message)
    }
})

// Get quote with specific id
app.get("/quotes/:id", async(req, res)=>{
    try{
        const { id } = req.params 
        
        const quote = await pool.query(
            "SELECT * FROM quotes where quote_id = $1", 
            [id]
        ); 
        
        // Quote not found
        if(quote.rows.length === 0){
            res.sendStatus(400)
            return
        }

        res.json(quote.rows[0]);
    
    } catch (err) {
        console.error(err.message)
    }
})

// create a quote
app.post("/quotes", async(req,res)=>{
    try{
        const { quote } = req.body // Destructure
        
        if(!quote){
            res.sendStatus(400)
            return
        }

        const newQuote = await pool.query(
            "INSERT INTO quotes (quote) VALUES ($1) RETURNING *", 
            [quote]
        );

        res.json(newQuote.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})

// update a quote
app.put("/quotes/:id", async(req, res) =>{
    try{
        console.log("Update endpoint triggered");

        const { id } = req.params
        const { quote } = req.body 

        const originalQuote = await pool.query(
            "SELECT * FROM quotes WHERE quote_id = $1",
            [ id ]
        )
         
        console.log(`Original Quote: ${JSON.stringify(originalQuote.rows[0])}`);

        const updatedQuote = await pool.query(
            "UPDATE quotes SET quote = $1 WHERE quote_id = $2 RETURNING *",
            [ quote, id ] 
        );
        
        
        console.log(`Updated Quote: ${JSON.stringify(updatedQuote.rows[0])}`);
        
        
        res.json("Quote was updated!"); 
    } catch(err){
        console.error(err.message)
    }
})

// Delete ALL quotes 
app.delete("/quotes", async(req, res)=>{
    try{
        const quote = await pool.query(
            "TRUNCATE quotes RESTART IDENTITY", // TRUNCATE INSTEAD OF DELETE TO RESET quote_id.
        ); 
        
        res.json("All quotes successfully deleted");
    
    } catch (err) {
        console.error(err.message)
    }
})

// Delete quote with specific id
app.delete("/quotes/:id", async(req, res)=>{
    try{
        const { id } = req.params 
        
        const quote = await pool.query(
            "DELETE FROM quotes where quote_id = $1", 
            [id]
        ); 
        
        res.json("Quote successfully deleted");
    
    } catch (err) {
        console.error(err.message)
    }
})


module.exports =  app
/* app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
*/
