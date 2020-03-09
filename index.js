const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.status(200);
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`API RUNNING ON localhost:${PORT}`);
});
