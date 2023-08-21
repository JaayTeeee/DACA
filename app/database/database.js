const express = require("express");
const cors = require("cors"); // Import the cors module
const Database = require("better-sqlite3");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketIO(server);
exports.module = io;
// Middleware to parse JSON requests
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Change this to your client's origin
    methods: ["GET", "POST"], // Add the methods you need
  })
);

const db = new Database("./database.db");

global.id = null;

app.post("/api/insertid", (req, res) => {
  global.id = req.body;
  const idValue = id["id"];

  try {
    console.log("Received address:", idValue);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error inserting address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define API endpoint for inserting data
app.post("/api/insert", (req, res) => {
  const { username, gender, age } = req.body;
  const idValue = global.id["id"];

  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS userData (
        userid INTEGER PRIMARY KEY,
        address TEXT UNIQUE,
        username TEXT,
        gender TEXT,
        age INTEGER,
        chatPreference TEXT
      )
    `);

    const insertStmt = db.prepare(
      "INSERT INTO userData (address, username, gender, age, chatPreference) VALUES (?, ?, ?, ?, ?)"
    );
    insertStmt.run(idValue, username, gender, age, "english");

    console.log("Data inserted successfully:", {
      address: idValue,
      username: username,
      gender: gender,
      age: age,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//home page
app.post("/api/check", (req, res) => {
  global.id = req.body;
  const address = id["id"];

  try {
    const checkStmt = db.prepare(
      "SELECT username FROM userData WHERE address = ?"
    );
    const result = checkStmt.get(address);

    if (result) {
      console.log("User exists with address:", address);
      res.status(200).json({ success: true, address: result.address });
    } else {
      console.log("User not found with address:", address);
      res.status(200).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error checking data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//welcome page
app.post("/api/checkUsername", (req, res) => {
  global.id = req.body;
  const address = id["id"];

  try {
    const checkStmt = db.prepare(
      "SELECT username FROM userData WHERE address = ?"
    );
    const result = checkStmt.get(address);

    if (result) {
      console.log("User exists with address (welcome page):", result);
      res.status(200).json({ success: true, username: result.username });
    } else {
      console.log("User not found with address (welcome page):", result);
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error checking data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//profile page
app.post("/api/viewData", (req, res) => {
  global.id = req.body;
  const address = id["id"];

  try {
    const checkStmt = db.prepare("SELECT * FROM userData WHERE address = ?");
    const result = checkStmt.get(address);

    if (result) {
      console.log("Data founded:", result);
      res
        .status(200)
        .json({
          success: true,
          username: result.username,
          age: result.age,
          gender: result.gender,
          chatPreference: result.chatPreference,
        });
    } else {
      console.log("Data cannot found:", result);
      res.status(404).json({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.error("Error checking data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//welcome page
app.post("/api/checkUsername", (req, res) => {
  global.id = req.body;
  const address = id["id"];

  try {
    const checkStmt = db.prepare(
      "SELECT username FROM userData WHERE address = ?"
    );
    const result = checkStmt.get(address);

    if (result) {
      console.log("User exists with address (welcome page):", result);
      res.status(200).json({ success: true, username: result.username });
    } else {
      console.log("User not found with address (welcome page):", result);
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error checking data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//profile page - delete account
app.post("/api/deleteAcc", (req, res) => {
  global.id = req.body;
  const address = global.id["id"];

  try {
    const checkStmt = db.prepare("DELETE FROM userData WHERE address = ?");
    const result = checkStmt.get(address);

    if (result) {
      console.log("Delete successfully:", result);
      res.status(200).json({ success: true });
    } else {
      console.log("Delete failed:", result);
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error checking data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//profile page - update data
app.post("/api/updateData", (req, res) => {
  const { username, gender, age, chatPreference } = req.body;
  const address = global.id["id"];

  try {
    const updateStmt = db.prepare(
      "UPDATE userData SET username = ?, gender = ?, age = ?, chatPreference = ? WHERE address = ?"
    );
    updateStmt.run(username, gender, age, chatPreference, address);

    console.log("update successfully");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//chat page - match chat language
app.post("/api/chatLanguage", (req, res) => {
  global.id = req.body;
  const address = global.id["id"];

  try {
    const checkStmt = db.prepare(
      "SELECT chatPreference FROM userData WHERE address = ?"
    );
    const result = checkStmt.get(address);

    if (result) {
      console.log("Find chatPreference successfully:", result);
      res.status(200).json({ success: true, username: result.username });
    } else {
      console.log("Failed to find chatPreference:", result);
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error checking data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//chat page - find user
app.post("/api/findUser", (req, res) => {
  const { address, chatPreference } = req.body;

  try {
    const checkStmt = db.prepare(
      "SELECT username FROM userData WHERE chatPreference = ? AND address = ? ORDER BY RAND() LIMIT 1;"
    );
    const result = checkStmt.get(chatPreference, address);

    if (result) {
      console.log("User connected successfully:", result);
      res.status(200).json({ success: true, username: result.username });
    } else {
      console.log("Failed to find user:", result);
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error checking data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(data);
    socket.emit("receive_message", data);
  });
});
