const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const port = 4000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  const address = ws._socket.remoteAddress;
  console.log("Connection received: ", address);

  ws.on("message", wss.broadcast);
});

wss.broadcast = function broadcastMsg(sender, msg) {
  wss.clients.forEach(function each(client) {
    if (client !== sender) {
      client.send(msg);
    }
  });
};

server.listen(port, function () {
  console.log(`Server is listening on ${port}!`);
});
