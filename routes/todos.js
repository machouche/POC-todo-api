const express = require('express');
const router = express.Router();
const mongoose = require('../config/db/mongoose');
const Todo = require('../config/models/todo');


router.get('/', (req, res) => {
    const todo = new Todo();
    Todo.find().then(doc => res.send(doc));
});

router.post('/', (req, res) => {
    const todo = new Todo({ text: req.body.text });
    res.send();
    todo.save().then(() => res.status(400).send(),
        err => res.status(400).send(err)
    );
});





module.exports = router;