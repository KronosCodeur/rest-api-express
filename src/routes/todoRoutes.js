const {getTodos, createTodo, changeTodoStatus, deleteTodo, updateTodo} = require("../controllers/todoController");
const todoRoutes = require('express').Router();

todoRoutes.get('/todo/all',getTodos);
todoRoutes.post('/todo/create',createTodo);
todoRoutes.get('/todo/change-status/:id',changeTodoStatus);
todoRoutes.put('/todo/update/:id', updateTodo);
todoRoutes.delete('/todo/delete/:id',deleteTodo);

module.exports = todoRoutes;