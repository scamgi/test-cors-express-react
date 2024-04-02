const express = require("express");
const cors = require("cors");
const { writeDataToFile } = require("./utils");
let users = require("./db/users.json");

const PORT = 5000;
const app = express();

// enable middleware to parse body of Content-type: application/json
app.use(express.json());

app.get("/api/users", (req, res) => {
  res.send(users);
});

app.post("/api/users", (req, res) => {
  const id = 5;
  const { name, surname } = req.body;

  const newUser = { id, name, surname };
  users.push(newUser);
  writeDataToFile("./db/users.json", users);
  return res.send(newUser);
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((p) => p.id.toString() !== id);
  console.log(users);
  console.log(id);
  writeDataToFile("./db/users.json", users);
  return res.send({ message: `User ${id} removed.` });
});

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}.`);
});
