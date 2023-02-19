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
const { userJoin, getUser, userLeave } = require("./socket/socket");
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
  console.log("socket is active to be connected");
  socket.on("joinRoom", (payload) => {
    const { room } = userJoin({
      socketId: socket.id,
      room: payload.room,
      username: payload.userName,
    });
    if (room) {
      socket.join(room);
      console.log("joinRoom payload", payload);
      io.emit("joinRoom", payload);
    }
  });

  socket.on("sendCode", (payload) => {
    console.log("sendCode event triggered");
    if (getUser(socket.id)) {
      console.log("sendCode event triggered", payload);
      io.emit("sendCode", payload);
    }
  });

  socket.on("sendInput", (payload) => {
    if (getUser(socket.id)) {
      console.log("send Input event triggered", payload);
      io.emit("sendInput", payload);
    }
  });

  socket.on("sendLang", (payload) => {
    if (getUser(socket.id)) {
      console.log("send Lang event triggered", payload);
      io.emit("sendLang", payload);
    }
  });

  socket.on("sendOutput", (payload) => {
    if (getUser(socket.id)) {
      console.log("send Output event triggered", payload);
      io.emit("sendOutput", payload);
    }
  });

  socket.on("disconnect", (payload) => {
    const user = userLeave(socket.id);
    if (user) {
      console.log("disconnect event triggered", payload);
      io.emit("disconnect", payload);
    }
  });
});

server.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
