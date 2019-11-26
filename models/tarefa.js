const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

const ObjectId = mongodb.ObjectId;

class tarefa {

  constructor(descricao, dtPrevisao, dtConclusao, observacao, id) {
    this.descricao = descricao;
    this.dtPrevisao = dtPrevisao;
    this.dtConclusao = dtConclusao;
    this.observacao = observacao;
    this._id = id ? new ObjectId(id) : undefined;
  }

  // this method gonna be the add and update
  save() {
    const db = getDb();
    let dbOperation;

    // if 'this._id', the resource already exists, then we gonna update
    if(this._id) {
      dbOperation = db.collection('tarefas').updateOne(
        { _id: this._id },
        { $set: {
            descricao: this.descricao,
            dtPrevisao: this.dtPrevisao,
            dtConclusao: this.dtConclusao,
            observacao: this.observacao
          } 
        }
      );

    // if not 'this._id', we gonna create
    } else {
      dbOperation = db.collection('tarefas').insertOne(this);
    }

    return dbOperation;
  }

  static fetchAll() {
    const db = getDb();
    // quero aqui ordenar pelos campos 'dtPrevisao', depois 'descricao', e ambos em sentido ascendente (1)
    // sort(keyOrList, direction)
    return db.collection('tarefas').find()
      .sort(['dtPrevisao', 'descricao'], 1)
      .toArray()
        .then(tarefas => {
          return tarefas;
        })
        .catch(err => {
          console.log(err);
        });
  }

  static findById(tarefaId) {
    const db = getDb();
    return db.collection('tarefas').findOne(
      { _id: new ObjectId(tarefaId) }
    )
    .then(tarefa => {
      console.log('from tarefaModel, tarefa: ', tarefa);
      return tarefa;
    })
    .catch(err => {
      console.log(err);
      throw new Error(err);
    })
  }

  static deleteById(tarefaId) {
    const db = getDb();
    return db.collection('tarefas').deleteOne(
      { _id: new ObjectId(tarefaId) }
    )
    .then(result => {
      console.log('Deleted');
    })
    .catch(err => {
      console.log(err);
      throw new Error(err);
    });
  }
}

module.exports = tarefa;