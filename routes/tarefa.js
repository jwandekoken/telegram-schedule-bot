const express = require('express');
const tarefaController = require('../controllers/tarefa');

const router = express.Router();

// create new tarefa
router.post('/tarefas', tarefaController.postAddTarefa);

// edit tarefa
router.put('/tarefas', tarefaController.putEditTarefa);

// fetch all tarefas
router.get('/tarefas', tarefaController.getTarefas);

// fetch tarefa by id
router.get('/tarefas/:tarefaId', tarefaController.getTarefaById);

// delete tarefa
router.delete('/tarefas/:tarefaId', tarefaController.postDeleteTarefa);

module.exports = router;
