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
  let room;
  console.log("socket is active to be connected");
  socket.on("joinRoom", (payload) => {
    room = userJoin({
      socketId: socket.id,
      room: payload.room,
      username: payload.userName,
    });
    console.log(room);
    if (room) {
      socket.join(room);
      console.log("joinRoom payload", payload);
      io.to(room).emit("joinRoom", payload);
    }
  });

  socket.on("sendCode", (payload) => {
    const room = getUser(socket.id);
    if (room) {
      console.log("sendCode event triggered room: ", room);
      io.to(room).emit("sendCode", payload);
    }
  });

  socket.on("sendInput", (payload) => {
    const room = getUser(socket.id);
    if (room) {
      console.log("send Input event triggered", payload);
      io.to(room).emit("sendInput", payload);
    }
  });

  socket.on("sendLang", (payload) => {
    const room = getUser(socket.id);
    if (room) {
      console.log("send Lang event triggered", payload);
      io.to(room).emit("sendLang", payload);
    }
  });

  socket.on("sendOutput", (payload) => {
    const room = getUser(socket.id);
    if (room) {
      console.log("send Output event triggered", payload);
      io.to(room).emit("sendOutput", payload);
    }
  });

  socket.on("leaveRoom", (payload) => {
    const room = getUser(socket.id);
    const user = userLeave(socket.id);
    if (room) {
      console.log("disconnect event triggered", payload);
    }
  });
});

server.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
