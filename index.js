const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const path = require("path");
const PORT = process.env.PORT || 5000;

//process.env.PORT 
//process.env.NODE_ENV => production or undefined

//middleware
app.use(cors());
app.use(express.json())
// app.use(express.static("./client/build"))

if (process.env.NODE_ENV === 'production') {
    //server static content
    //npm run build
    app.use(express.static(path.join(__direname, "client/build")))
}


//-------------------------ROUTES------------------------------------//
//-------------------------------------------------------------------//

//create a todo

app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *",
            [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})

// get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// get a todo

app.get("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows);
    } catch (error) {
        console.error(error.message)
    }
})

// update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("todo was updated");
    } catch (error) {
        console.error(error.message)
    }
})

// delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted");
    } catch (error) {
        console.log(error.message)
    }
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

app.listen(PORT, () => {
    console.log(`server started on port${PORT}`)    
})

// "node": "14.15.4",