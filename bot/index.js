const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const moment = require('moment');
const env = require('../.env');
const { getSchedule, getTask } = require('./scheduleServices');

const bot = new Telegraf(env.token);

const formatDate = date => {
 return date ? moment(date).format('DD/MM/YYYY') : '';
}

// when 'newMsg' equal false, we gonna use 'ctx.editMessageText()', when equal true we gonna use 'ctx.reply()'
const showTask = (ctx, taskId, newMsg = false) => {
  getTask(taskId)
    .then(res => {

      if(!res) {
        return console.log('Task not found.')
      }

      const conclusionDate = res.conclusionDate ? `\n<b>Concluída em:</b> ${formatDate(res.conclusionDate)}` : '';

      const msg = `
        <b>${res.description}</b>
        <b>Previsão: ${formatDate(res.dueDate)}${conclusionDate}</b>
        <b>Observações:</b>\n${res.comments || ''}
      `;

      if(newMsg) {
        ctx.reply(msg, taskButtons(taskId))
      } else {
        ctx.editMessageText(msg, taskButtons(taskId));
      }
    })
    .catch();
}

// receive a task array and return a inlineKeyboard with each task being a callbackButton
const scheduleButtons = tasks => {

  const buttons = tasks.map(item => {
    const dueDate = item.dueDate ? 
      `${moment(item.dueDate).format('DD/MM/YYY')} - ` : '';

    return [Markup.callbackButton(`${dueDate}${item.description}`, `show ${item._id}`)]
  });
  return Extra.markup(Markup.inlineKeyboard(buttons, {columns: 1}));
};

bot.start(ctx => {
  const nome = ctx.message.from.first_name;
  ctx.reply(`Seja bem vindo, ${nome}`);
});

bot.command('agenda', ctx => {
  showTask(ctx, '5ddd2b7e8700c817c8d5d428', true);
});



exports.bot = bot;