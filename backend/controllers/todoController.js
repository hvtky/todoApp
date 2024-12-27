const Todo = require('../models/todoModel');

exports.getTodos = (req, res) => {
    Todo.findAllByEmail(req.query.email, async (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }res.json(result.todos);
    })
}
exports.addTodo = (req, res) => {
    Todo.create(req.body, async (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }res.status(201).send(result);
    })
}
exports.updateTodo = (req, res) => {
    Todo.update(req.params.id, req.body, async (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }res.status(200).json({status: result, message: 'cap nhat thanh cong'});
    })
}
exports.deleteTodo = (req, res) => {
    Todo.delete(req.params.id, req.body.email, async (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }res.status(200).json({status: result, message: 'xoa thanh cong', id: req.params.id});
    })
}