const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(201).send("heyy!!!");
});

app.post("/code", (req, res) => {
  console.log(req.body);
  res.status(201).json(req.body);
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
