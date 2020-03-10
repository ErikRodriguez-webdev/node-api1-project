const express = require("express");
const shortid = require("shortid");

const server = express();

let users = [];

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (req.body.name && req.body.bio) {
    const userSchema = req.body;
    userSchema.id = shortid.generate();
    users.push(userSchema);
    res.status(201).json(userSchema);
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database."
    });
  }
});

server.get("/api/users", (req, res) => {
  if (users.length === 0) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  } else {
    res.status(200).json(users);
  }
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const selectUser = users.filter((each) => {
    return each.id === id;
  });
  if (selectUser.length === 0) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (selectUser) {
    res.status(200).json(selectUser);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`API RUNNING ON localhost:${PORT}`);
});
