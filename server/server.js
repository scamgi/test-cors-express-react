const express = require("express");
const cors = require("cors");
const { writeDataToFile } = require("./utils");
let users = require("./db/users.json");

const PORT = 5000;
const app = express();

app.get("/api/users", (req, res) => {
  res.send(users);
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter(p => p.id !== id);
  writeDataToFile('./db/users.json');
  return res.send({ message: `User ${id} removed.` });
})

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}.`);
});
