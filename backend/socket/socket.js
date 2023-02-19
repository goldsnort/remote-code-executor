const rooms = [];

const userJoin = ({ socketId, username, room }) => {
  console.log("userJoin triggered", room);
  const user = { socketId, username };
  let flag = false;
  rooms.map((ele) => {
    if (ele.roomName === room) {
      flag = true;
      ele.users.push(user);
      console.log("existing room and user pushed");
      return room;
    }
  });
  if (!flag) {
    console.log("non existing room and user pushed");
    rooms.push({ roomName: room, users: [user] });
  }
  return room;
};

const userLeave = (socketId) => {
  let user;
  rooms.map((room) => {
    room.users.map((user) => {
      if (user.socketId === socketId) {
        user = user;
        room.users.splice(room.users.indexOf(user), 1);
        if (room.users.length === 0) {
          rooms.splice(rooms.indexOf(room), 1);
        }
      }
    });
  });
  return user;
};

const getRoomUsers = (room) => {
  let users;
  rooms.map((room) => {
    if (room.roomName === room) {
      users = room.users;
    }
  });
  return users;
};

const getUser = (socketId) => {
  let user;
  rooms.map((room) => {
    room.users.map((user) => {
      if (user.socketId === socketId) {
        user = user;
      }
    });
  });
  return socketId;
};

module.exports = { getUser, getRoomUsers, userJoin, userLeave };
