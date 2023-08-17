const express = require('express');
const cors = require('cors'); // Import the cors module
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Change this to your client's origin
    methods: ['GET', 'POST'], // Add the methods you need
  }));

const db = new Database('../../signup/database/database.db');

global.id = null;

app.post('/api/insert1', (req, res) => {
  global.id = req.body;

  try{
    console.log('Received id:', global.id);
    res.status(200).json({ success: true });
} catch (error) {
  console.error('Error inserting address:', error);
  res.status(500).json({ error: 'Internal server error' });
}
});

// Define API endpoint for inserting data
app.post('/api/insert', (req, res) => {
  const { username, gender, age } = req.body;

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

    console.log('Data inserted successfully:', {
        userid: global.id,
        username: username,
        gender: gender,
        age: age,
      });
    

    const insertStmt = db.prepare('INSERT INTO userData (userid, username, gender, age, chatPreference) VALUES (?, ?, ?, ?, ?)');
    insertStmt.run(global.id, username, gender, age, '');

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/insert1', (req, res) => {
  const { id } = req.query; // Use req.query to access query parameters

  try {
    const checkStmt = db.prepare('SELECT * FROM userData WHERE userid = ?');
    const result = checkStmt.get(id);

    if (result) {
      console.log('User exists with id:', id);
      res.status(200).json({ success: true });
    } else {
      console.log('User not found with id:', id);
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error checking data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
