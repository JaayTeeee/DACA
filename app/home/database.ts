import * as sqlite3 from 'sqlite3';

interface UserData {
    userid: number;
    username: string;
    gender: string;
    age: number;
    chatPreference: string;
  }

const db = new sqlite3.Database(':memory:'); // In-memory database

db.serialize(() => {
  // Create a table
  db.run(`
    CREATE TABLE IF NOT EXISTS userData (
      userid INTEGER PRIMARY KEY,
      username TEXT,
      gender TEXT,
      age INTEGER,
      chatPreference TEXT
    )
  `);

  // Insert data
  const insertStmt = db.prepare('INSERT INTO userData (username, gender, age, chatPreference) VALUES (?, ?, ?, ?)');
  insertStmt.run('Jane Smith', 'jane@example.com', 18, '');
  insertStmt.finalize();

// Retrieve data
db.each('SELECT username, gender, age, chatPreference FROM userData', (err, row: UserData) => {
    if (err) {
      console.error('Error fetching data:', err);
      return;
    }

    // Explicitly specify the types for the row
    console.log(row.userid, row.username, row.gender, row.age, row.chatPreference);
  });
});

db.close((err) => {
  if (err) {
    console.error('Error closing database:', err);
  }
});