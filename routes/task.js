const express = require('express');
const taskController = require('../controllers/task');

const router = express.Router();

// create new task
router.post('/tasks', taskController.postAddTask);

// edit task
router.put('/tasks', taskController.putEditTask);

// fetch all tasks
router.get('/tasks', taskController.getTasks);

// fetch task by id
router.get('/tasks/:taskId', taskController.getTaskById);

// delete task
router.delete('/tasks/:taskId', taskController.postDeleteTask);

module.exports = router;

