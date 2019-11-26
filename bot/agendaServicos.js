const axios = require('axios');
const moment = require('moment');

const baseUrl = `http://localhost:3000/tarefas`;

exports.getAgenda = date => {
  return axios.get(baseUrl)
    .then(res => {
      console.log(res.data);
      // essa function recebe um item, e retorna esse item (estamos usando o implicity return) se a dtConclusao for nula (ou estiver vazia) e se a dtPrevisao for a mesma ou anterior à data que foi passada (ou seja, tarefas que a data de previsao ja venceu)
      const pendente = (item) => (item.dtConclusao === null || item.dtConclusao === '') && moment(item.dtPrevisao).isSameOrBefore(date);

      // vamos retornar aqui os itens de 'res.data' que estao pendentes. Veja que o filter vai passar para a function 'pendente' o item atual da iteração
      return res.data.filter(pendente);
    })
    .catch(err => {
      console.log(err);
    })
};

exports.getTarefa = id => {
  return axios.get(`${baseUrl}/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};