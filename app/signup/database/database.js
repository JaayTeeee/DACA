const express = require('express');
const { Database } = require('better-sqlite3');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define API endpoint
app.post('/signup/database', (req, res) => {
  const { username, gender, age } = req.body;

  const db = new Database(':memory:');

  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS userData (
        userid INTEGER PRIMARY KEY,
        username TEXT,
        gender TEXT,
        age INTEGER,
        chatPreference TEXT
      )
    `);

    const insertStmt = db.prepare('INSERT INTO userData (username, gender, age, chatPreference) VALUES (?, ?, ?, ?)');
    insertStmt.run(username, gender, age, '');

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    db.close();
  }
});

// Handle unsupported methods
app.all('../signup/Form', (req, res) => {
  res.status(405).json({ error: 'Method not allowed' });
});

// Start the server
app.listen(3000)