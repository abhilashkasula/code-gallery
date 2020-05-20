const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));

module.exports = {app};