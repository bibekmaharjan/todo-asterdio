const db = require('../config/db');

const Todo = {
    create: (userId, title, callback) => {
        db.run("INSERT INTO todos (user_id, title, completed) VALUES (?, ?, 0)", [userId, title], function(err) {
            callback(err, this.lastID);
        });
    },
    getAll: (userId, callback) => {
        db.all("SELECT * FROM todos WHERE user_id = ?", [userId], (err, rows) => {
            callback(err, rows);
        });
    },
    update: (id, title, completed, callback) => {
        db.run("UPDATE todos SET title = ?, completed = ? WHERE id = ?", [title, completed, id], function(err) {
            callback(err);
        });
    },
    delete: (id, callback) => {
        db.run("DELETE FROM todos WHERE id = ?", [id], function(err) {
            callback(err);
        });
    }
};

module.exports = Todo;
