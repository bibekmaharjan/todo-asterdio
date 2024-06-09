const db = require('../config/db');

const User = {
    create: (username, hashedPassword, callback) => {
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function(err) {
            callback(err, this.lastID);
        });
    },
    findByUsername: (username, callback) => {
        db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
            callback(err, row);
        });
    },
    findById: (id, callback) => {
        db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
            callback(err, row);
        });
    }
};

module.exports = User;
