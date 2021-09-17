const express = require('express');

const app = express();

const serveStatic = require('serve-static');
const path = require('path');

const router = express.Router();
app.use(router);
app.use(serveStatic(path.join(__dirname, '../../dist')));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Express server listening on port ', port);
});
