const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = express.Router();
const PORT = 4000;
let Todo = require("./todo.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Root Route
todoRoutes.route("/").get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route("/:id").get((req, res) => {
  let id = req.params.id;
  console.log(`id:${id}`);
  Todo.findById(id, (err, todo) => {
    res.json(todo);
  });
});

todoRoutes.route("/edit/:id").post((req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (!todo) {
      console.log(`Server: todo ${req.params.id} not found.`);
      res.status(404).send(`todo ${req.params.id} not found.`);
    } else {
      console.log(`Server: found ${req.params.id} ...`);
      todo.description = req.body.description;
      todo.assignee = req.body.assignee;
      todo.priority = req.body.priority;
      todo.isComplete = req.body.isComplete;
      todo
        .save()
        .then((todo) => {
          res.json(`updated:\n${JSON.stringify(todo, null, 2)}`);
        })
        .catch((err) => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

todoRoutes.route("/add").post((req, res) => {
  let todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json({ todo: todo.json() });
    })
    .catch((err) => {
      res.status(400).send("adding new todo failed");
    });
});

// delete
// todoRoutes.route('/delete/:id').delete((req, res) => {
//     console.log(`Incoming DELETE /delete/${req.params.id}`);
//     Todo.deleteOne({_id: req.params.id}, () => res.status(200).send(`deleted ${req.params.id}`));
// })

app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
