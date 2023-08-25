const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const port = 4000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store the connected users
const connectedUsers = new Set();

wss.on("connection", function connection(ws) {
  const address = ws._socket.remoteAddress;
  console.log("Connection received: ", address);

  ws.on("message", function incoming(message) {
    const data = JSON.parse(message);
    if (data.type === "connect") {
      // Store the username of the connected user
      connectedUsers.add(data.username);

      // Notify the other user about the connection
      const otherUser = getOtherUser(data.username);
      if (otherUser) {
        sendConnectionStatus(otherUser, "connected");
      }
    } else {
      // Broadcast the message to all connected clients
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  });

wss.on("disconnected", function disconnect() {
  // Notify the other user about the disconnection
  const otherUser = getOtherUser(username);
  if (otherUser) {
    sendConnectionStatus(otherUser, "closed");
  }
})

  ws.on("close", function close() {
    const username = getUsernameBySocket(ws);
    if (username) {
      // Remove the disconnected user from the set
      connectedUsers.delete(username);
    }
  });
});

function getUsernameBySocket(socket) {
  // Find the username based on the socket object
  for (const client of wss.clients) {
    if (client === socket) {
      return client.username;
    }
  }
  return null;
}

function getOtherUser(username) {
  // Find the other user's username
  for (const user of connectedUsers) {
    if (user !== username) {
      return user;
    }
  }
  return null;
}

function sendConnectionStatus(username, status) {
  // Send connection status message to the specified user
  const client = getClientByUsername(username);
  if (client) {
    client.send(JSON.stringify({ type: "connectionStatus", username, status }));
  }
}

function getClientByUsername(username) {
  // Find the client WebSocket object based on the username
  for (const client of wss.clients) {
    if (client.username === username) {
      return client;
    }
  }
  return null;
}

server.listen(port, function () {
  console.log(`Server is listening on ${port}!`);
});
