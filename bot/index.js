const Telegraf = require('telegraf');
const axios = require('axios');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const moment = require('moment');
const env = require('../.env');
const agendaServicos = require('./agendaServicos');

const bot = new Telegraf(env.token);

const formatDate = date => {
 return date ? moment(date).format('DD/MM/YYY') : '';
}

// o param 'newMsg' qnd tiver false, vamos usar o 'ctx.editMessageText()', qnd tiver true vamos usar o 'ctx.reply()'
const showTarefa = (ctx, tarefaId, newMsg = false) => {
  getTarefa(tarefaId)
    .then(res => {
      const conclusao = res.dtConclusao ? `\n<b>Concluída em:</b> ${formatDate(res.dtConclusao)}` : '';

      const msg = `
        <b>${res.descricao}</b>
        <b>Previsão: ${formatDate(res.dtPrevisao)}${conclusao}</b>
        <b>Observações:</b>\n${res.observacao || ''}
      `;

      if(newMsg) {
        ctx.reply(msg, tarefaButtons(tarefaId))
      } else {
        ctx.editMessageText(msg, tarefaButtons(tarefaId));
      }
    })
    .catch();
}

bot.start(ctx => {
  const nome = ctx.message.from.first_name;
  ctx.reply(`Seja bem vindo, ${nome}`);
});



bot.command('agenda', ctx => {
  agendaServicos.getTarefa('5ddd2b7e8700c817c8d5d428')
    .then(res => {
      console.log(res);
      res = JSON.stringify(res);
      ctx.reply(res);
    })
    .catch(err => {
      console.log(err);
    })
});



exports.bot = bot;