const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

router.get('/tasks', TaskController.getAllTasks);
router.get('/task/:id', TaskController.getTaskById);
router.delete('/task/:id', TaskController.deleteTask);
router.put('/task/:id', TaskController.updateTask);
router.post('/task', TaskController.createTask);

module.exports = router;
