const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer();
const io = socketIO(server);
const PORT_CHAT = process.env.PORT_CHAT || 4000;

io.on('connection', (socket) => {
  console.log('A user connected.');

  socket.on('send_message', (data) => {
    // Broadcast the received message to all connected clients
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');

    // Send a disconnect message to all connected clients
    io.emit('receive_message', {
      room: data.room, // Assuming you have room information
      author: 'System', // You can use a 'System' user to indicate system messages
      message: 'The user has left the chat',
      time: new Date().toLocaleTimeString(),
    });
  });
});

server.listen(PORT_CHAT, () => {
  console.log(`Multi-client chat server is running on port ${PORT_CHAT}`);
});
