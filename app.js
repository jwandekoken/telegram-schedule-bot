const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./utils/database').mongoConnect;

const tarefaRoutes = require('./routes/tarefa');

const app = express();

/*
  na linha abaixo é como fazemos para trabalhar com dados no formato
  'x-www-form-urlencoded', dados vindo de <form>
*/
//app.use(bodyParser.urlencoded());

/*
  na linha abaixo é como fazemos para trabalhar com no formato
  'application/json'
*/
app.use(bodyParser.json());

app.use(tarefaRoutes);

mongoConnect(() => {
  app.listen(3000, () => {
    console.log('server listening on http://localhost:3000');
  });
});
