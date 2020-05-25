const express = require('express');
const redis = require('redis');
const cookieParser = require('cookie-parser');
const handlers = require('./handlers');
const Users = require('./models/users');
const Challenges = require('./models/challenges');
const {challengesRouter} = require('./routes/challenges');
const {notifySlack} = require('./notifySlack');
const {REDIS_URL} = require(`${__dirname}/../config.js`);

const app = express();
const client = redis.createClient(REDIS_URL);

(() => {
  client.get('code-gallery-users', (err, data) => {
    app.locals.users = Users.load(JSON.parse(data || '[]'));
  });

  client.get('code-gallery-challenges', (err, data) => {
    app.locals.challenges = Challenges.load(JSON.parse(data || '[]'));
  });
})();

app.locals.sessions = {};
app.locals.db = client;
app.locals.notifySlack = notifySlack;

app.set('view engine', 'ejs');
app.use(express.static('public', {index: false}));
app.use(cookieParser());
app.use(express.json());
app.use(handlers.findUser);
app.get('/', handlers.serveHomepage);
app.post('/login', handlers.hasFields('username', 'password'), handlers.login);
app.post( '/signup', handlers.hasFields('username', 'password'), handlers.signup );
app.get('/logout', handlers.logout);
app.use('/challenges', challengesRouter);
app.use(handlers.serveNotFound);

module.exports = {app};
