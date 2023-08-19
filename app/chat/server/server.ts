const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer();
const io = socketIO(server);
const PORT_CHAT = process.env.PORT_CHAT || 4000;

io.on("connection", (socket: any) => {
  console.log("User connected");

  socket.on("send_message", (data: any) => {
    console.log(data);
    io.emit("receive_message", data);
  });
});

server.listen(PORT_CHAT, () => {
  console.log(`Multi-client chat server is running on port ${PORT_CHAT}`);
});
