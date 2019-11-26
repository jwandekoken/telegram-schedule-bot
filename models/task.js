const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

const ObjectId = mongodb.ObjectId;

class tarefa {

  constructor(description, dueDate, conclusionDate, comments, id) {
    this.description = description;
    this.dueDate = dueDate;
    this.conclusionDate = conclusionDate;
    this.comments = comments;
    this._id = id ? new ObjectId(id) : undefined;
  }

  // this method gonna be the add and update
  save() {
    const db = getDb();
    let dbOperation;

    // if 'this._id', the resource already exists, then we gonna update
    if(this._id) {
      dbOperation = db.collection('tasks').updateOne(
        { _id: this._id },
        { $set: {
            description: this.description,
            dueDate: this.dueDate,
            conclusionDate: this.conclusionDate,
            comments: this.comments
          } 
        }
      );

    // if not 'this._id', we gonna create
    } else {
      dbOperation = db.collection('tasks').insertOne(this);
    }

    return dbOperation;
  }

  static fetchAll() {
    const db = getDb();
    // quero aqui ordenar pelos campos 'dueDate', depois 'description', e ambos em sentido ascendente (1)
    // sort(keyOrList, direction)
    return db.collection('tasks').find()
      .sort(['dueDate', 'description'], 1)
      .toArray()
        .then(tasks => {
          return tasks;
        })
        .catch(err => {
          console.log(err);
        });
  }

  static findById(taskId) {
    const db = getDb();
    return db.collection('tasks').findOne(
      { _id: new ObjectId(taskId) }
    )
    .then(task => {
      console.log('from taskModel, task: ', task);
      return task;
    })
    .catch(err => {
      console.log(err);
      throw new Error(err);
    })
  }

  static deleteById(taskId) {
    const db = getDb();
    return db.collection('tasks').deleteOne(
      { _id: new ObjectId(taskId) }
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