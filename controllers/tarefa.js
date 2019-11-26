const Tarefa = require('../models/tarefa');

exports.postAddTarefa = (req, res, next) => {
  const descricao = req.body.descricao;
  const dtPrevisao = req.body.dtPrevisao;
  const dtConclusao = req.body.dtConclusao;
  const observacao = req.body.observacao;

  const tarefa = new Tarefa(
    descricao,
    dtPrevisao,
    dtConclusao,
    observacao,
    null
  );

  tarefa.save()
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

exports.putEditTarefa = (req, res, next) => {
  const tarefaId = req.body.tarefaId;
  const descricao = req.body.descricao;
  const dtPrevisao = req.body.dtPrevisao;
  const dtConclusao = req.body.dtConclusao;
  const observacao = req.body.observacao;

  const tarefa = new Tarefa(
    descricao,
    dtPrevisao,
    dtConclusao,
    observacao,
    tarefaId
  );

  tarefa.save()
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

exports.getTarefas = (req, res, next) => {
  Tarefa.fetchAll()
    .then(tarefas => {
      res.status(200).json(tarefas);
    })
    .catch(err => {
      console.log(err);
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.getTarefaById = (req, res, next) => {
  const tarefaId = req.params.tarefaId;

  Tarefa.findById(tarefaId)
    .then(tarefa => {
      res.status(200).json(tarefa);
    })
    .catch(err => {
      console.log(err);
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.postDeleteTarefa = (req, res, next) => {
  const tarefaId = req.params.tarefaId;

  Tarefa.deleteById(tarefaId)
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




