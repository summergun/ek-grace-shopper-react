const express = require('express');
const path = require('path');

const app = express();
module.exports = app;

app.use(require('body-parser').json());

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/google/login', (req, res, next)=> {
  res.send('TO DO - set up oauth with google-- <a href="/">Home</a>');
});

app.use('/api', require('./routes'));
