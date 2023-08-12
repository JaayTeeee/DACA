"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database(':memory:'); // In-memory database
db.serialize(function () {
    // Create a table
    db.run("\n    CREATE TABLE IF NOT EXISTS userData (\n      userid INTEGER PRIMARY KEY,\n      username TEXT,\n      gender TEXT,\n      age INTEGER,\n      chatPreference TEXT\n    )\n  ");
    // Insert data
    var insertStmt = db.prepare('INSERT INTO userData (username, gender, age, chatPreference) VALUES (?, ?, ?, ?)');
    insertStmt.run('Jane Smith', 'jane@example.com', 18, '');
    insertStmt.finalize();
    // Retrieve data
    db.each('SELECT username, gender, age, chatPreference FROM userData', function (err, row) {
        if (err) {
            console.error('Error fetching data:', err);
            return;
        }
        // Explicitly specify the types for the row
        console.log(row.userid, row.username, row.gender, row.age, row.chatPreference);
    });
});
db.close(function (err) {
    if (err) {
        console.error('Error closing database:', err);
    }
});
