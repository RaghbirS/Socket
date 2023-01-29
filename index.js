const io = require('socket.io')(process.env.PORT || 4000, {
  cors: {
    origin: '*',
  }
});

const users = {};

io.on("connection", (socket) => {
  console.log("A new user has connected");

  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    console.log(`${name} joined the chat`);
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", { message, name: users[socket.id] });
  });

  socket.on("disconnect", () => {
    console.log(`${users[socket.id]} has disconnected`);
    delete users[socket.id];
  });
});

console.log("Server started at 4000");