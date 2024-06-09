const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send("Error encrypting password");

        User.create(username, hashedPassword, (err, userId) => {
            if (err) return res.status(500).send("Error creating user");

            const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ token });
        });
    });
};

exports.signin = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, user) => {
        if (err || !user) return res.status(401).send("Invalid credentials");

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) return res.status(401).send("Invalid credentials");

            const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ token });
        });
    });
};

exports.me = (req, res) => {
    const { userId } = req.user;
    User.findById(userId, (err, user) => {
        if (err || !user) return res.status(404).send("User not found");
        res.json(user);
    });
};
