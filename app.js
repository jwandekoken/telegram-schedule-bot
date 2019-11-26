const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./utils/database').mongoConnect;

const taskRoutes = require('./routes/task');
const bot = require('./bot').bot;

const app = express();

app.use(bodyParser.json());

app.use(taskRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  // retrieving custom property or default 500
  const status = error.statusCode || 500;
  // retrieving default property
  const message = error.message;
  res.status(status).json({
    // ES6 syntax 'message: message'
    message
  });
});

mongoConnect(() => {
  app.listen(3000, () => {
    try {
      if(bot.launch()) {
        console.log('Bot is online and Server are listening on http://localhost:3000');
      }
    } catch(err) {
      console.log(err);
      next(err);
    }
  });
});
