const express = require("express");
const app = express();

app.use(express.static("web"));

// app.get("/", (req, res) => res.send("Hello"));

app.get("/api/v1/list", (req, res) => {
  const todoList = [
    { title: "todo-1", done: true },
    { title: "todo-2", done: false },
    { title: "todo-3", done: false }
  ];

  res.json(todoList);
});

app.listen(3000, () => console.log("Listening on port 3000"));
