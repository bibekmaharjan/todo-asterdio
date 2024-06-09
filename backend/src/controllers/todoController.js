const Todo = require('../models/Todo');

exports.createTodo = (req, res) => {
    const { title } = req.body;
    Todo.create(req.user.userId, title, (err, todoId) => {
        if (err) return res.status(500).send("Error creating to-do item");
        res.json({ id: todoId, title, completed: 0 });
    });
};

exports.getTodos = (req, res) => {
    Todo.getAll(req.user.userId, (err, todos) => {
        if (err) return res.status(500).send("Error retrieving to-do items");
        res.json(todos);
    });
};

exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    Todo.update(id, title, completed, err => {
        if (err) return res.status(500).send("Error updating to-do item");
        res.sendStatus(204);
    });
};

exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    Todo.delete(id, err => {
        if (err) return res.status(500).send("Error deleting to-do item");
        res.sendStatus(204);
    });
};
