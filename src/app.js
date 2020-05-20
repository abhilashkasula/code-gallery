const express = require('express');
const handlers = require('./handlers');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public', {index: false}))
app.get('/', handlers.serveHomepage);

module.exports = {app};