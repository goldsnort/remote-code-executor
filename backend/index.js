const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

let code = require("./routes/code");

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use("/code", code);
app.get("/", (req, res) => {
  res.status(201).send("heyy!!!");
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
