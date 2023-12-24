"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    console.log('request data=', req.body.text);
    const request = req.body;
    const data = request.text;
    const newTodo = {
        id: new Date().toISOString(),
        text: data,
    };
    todos.push(newTodo);
    res.status(200).json({ success: 1 });
});
router.delete('/deletetodo/:todoid', (req, res, next) => {
    const params = req.params;
    const todoid = params.todoid;
    console.log('todoid=', todoid);
    const result = deleteByIdInPlace(todoid);
    console.log('result=', result);
    if (result) {
        res.status(200).json({ 'Found:': 'item deleted' });
    }
    else {
        res.status(404).json({ status: 'Item Not found' });
    }
});
function deleteByIdInPlace(id) {
    const index = todos.findIndex(obj => obj.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        return true;
    }
    else
        return false;
}
router.put('/edittodo/:todoid', (req, res, next) => {
    const params = req.params;
    const todoid = params.todoid;
    const request = req.body;
    const data = request.text;
    const result = editByNameInPlace(todoid, data);
    console.log('result=', result);
    if (result) {
        res.status(200).json({ 'Found:': 'Name updated' });
    }
    else {
        res.status(404).json({ status: 'Item Not found' });
    }
});
function editByNameInPlace(id, newuser) {
    const index = todos.findIndex(obj => obj.id === id);
    if (index !== -1) {
        const todo = todos[index];
        todo.text = newuser;
        return true;
    }
    else
        return false;
}
exports.default = router;
