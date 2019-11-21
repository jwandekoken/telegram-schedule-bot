const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./utils/database').mongoConnect;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoConnect(() => {
  app.listen(3000, () => {
    console.log('server listening on http://localhost:3000');
  });
});
