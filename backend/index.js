const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 1000,
  pingInterval: 3000,
});

const cors = require("cors");

const PORT = process.env.PORT || 4000;

let code = require("./routes/code");

app.use(express.json());
app.use(cors());

app.use("/code", code);
app.get("/", (req, res) => {
  res.status(201).send("heyy!!!");
});

io.on("connection", (socket) => {
  socket.join("some room");

  console.log("what is a socket", socket);
  console.log("socket is active to be connected");
  socket.on("sendCode", (payload) => {
    console.log("what is payload", payload);
    io.emit("sendCode", payload);
  });
  socket.on("joinRoom", (payload) => {
    socket.join(payload.roomID);
    console.log("joinRoom payload", payload);
    io.emit("joinRoom", payload);
  });
});

server.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
