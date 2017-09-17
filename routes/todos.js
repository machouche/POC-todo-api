const { ObjectID } = require('mongodb');
const express = require('express');
const router = express.Router();
const mongoose = require('../config/db/mongoose');
const Todo = require('../config/models/todo');

router.get('/', (req, res) => {
    const todo = new Todo();

    Todo.find().then(
        todos => res.send(todos),
        err => res.status(404).send(err));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid) return res.status(404).send();


    Todo.findById(id).then(todo => {
        if (!todo) return res.status(404).send();

        res.send(todo);
    }).catch(e => res.status(400).send());
});

router.post('/', (req, res) => {
    const todo = new Todo({ text: req.body.text });

    todo.save().then(
        todo => res.send(todo),
        err => res.status(400).send(err)
    );
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid) return res.status(404).send();

    Todo.findByIdAndRemove(id)
        .then((todo) => {

            if (!todo) return res.status(404).send();

            res.send(todo);
        }).catch(e => res.status(400).send())
});


router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const { completed } = req.body;
    const body = {};
    if (!ObjectID.isValid(id)) return res.status(404).send();

    const $set = {
        completedAt: completed === true ? new Date().getTime() : null,
        completed
    }

    Todo.findByIdAndUpdate(id, { $set }, { new: true })
        .then(todo => {
            if (!todo) return res.status(404).send();
            res.send(todo);
        })
        .catch(e => res.status(400).send());
});



module.exports = router;