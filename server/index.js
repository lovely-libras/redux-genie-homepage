const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen({port}, function () {
  console.log(`Your server, listening on port ${port}`);
});