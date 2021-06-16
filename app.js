const express = require('express');
const app = express();
const port = 3000;
const pool = require("./db");

app.use(express.json()) // => req.body

// Routes //


// create a todo
app.post("/todos", async(req,res)=>{
    try{
        const { description } = req.body // Destructure
        
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *", 
            [description]
        );

        res.json(newTodo);
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
