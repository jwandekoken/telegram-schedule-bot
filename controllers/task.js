const Task = require('../models/task');

exports.postAddTask = (req, res, next) => {
  const description = req.body.description;
  const dueDate = req.body.dueDate;
  const conclusionDate = req.body.conclusionDate;
  const comments = req.body.comments;

  const task = new Task(
    description,
    dueDate,
    conclusionDate,
    comments,
    null
  );

  task.save()
    .then(result => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.putEditTask = (req, res, next) => {
  const taskId = req.body.taskId;
  const description = req.body.description;
  const dueDate = req.body.dueDate;
  const conclusionDate = req.body.conclusionDate;
  const comments = req.body.comments;

  const task = new Task(
    description,
    dueDate,
    conclusionDate,
    comments,
    taskId
  );

  task.save()
    .then(result => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.getTasks = (req, res, next) => {
  Task.fetchAll()
    .then(task => {
      res.status(200).json(task);
    })
    .catch(err => {
      console.log(err);
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.getTaskById = (req, res, next) => {
  const taskId = req.params.taskId;

  Task.findById(taskId)
    .then(task => {
      res.status(200).json(task);
    })
    .catch(err => {
      console.log(err);
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.postDeleteTask = (req, res, next) => {
  const taskId = req.params.taskId;

  Task.deleteById(taskId)
    .then(() => {
      console.log('TAREFA DELETADA');
      res.status(200).json({
        success: 1
      });
    })
    .catch(err => {
      console.log(err);
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}




