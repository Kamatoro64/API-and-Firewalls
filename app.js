const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const pool = require("./db");

app.use(morgan('combined'));
app.use(express.json()) // => req.body

// Routes //
// Get all todos
app.get("/todos", async(req, res)=>{
    try{
    
        const allTodos = await pool.query(
            "SELECT * FROM todo"
        ); 
        
        res.json(allTodos.rows);
    
    } catch (err) {
        console.error(err.message)
    }
})

// Get todo with specific id
app.get("/todos/:id", async(req, res)=>{
    try{
        const { id } = req.params 
        
        const todo = await pool.query(
            "SELECT * FROM todo where todo_id = $1", 
            [id]
        ); 
        
        res.json(todo.rows[0]);
    
    } catch (err) {
        console.error(err.message)
    }
})

// create a todo
app.post("/todos", async(req,res)=>{
    try{
        const { description } = req.body // Destructure
        
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *", 
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})

// update a todo
app.put("/todos/:id", async(req, res) =>{
    try{
        console.log("Update endpoint triggered");

        const { id } = req.params
        const { description } = req.body 

        const originalTodo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [ id ]
        )
         
        console.log(`Original Todo: ${JSON.stringify(originalTodo.rows[0])}`);

        const updatedTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
            [ description, id ] 
        );
        
        
        console.log(`Updated Todo: ${JSON.stringify(updatedTodo.rows[0])}`);
        
        
        res.json("Todo was updated!"); 
    } catch(err){
        console.error(err.message)
    }
})

// Delete todo with specific id
app.delete("/todos/:id", async(req, res)=>{
    try{
        const { id } = req.params 
        
        const todo = await pool.query(
            "DELETE FROM todo where todo_id = $1", 
            [id]
        ); 
        
        res.json("Todo successfully deleted");
    
    } catch (err) {
        console.error(err.message)
    }
})

















app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
