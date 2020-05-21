const express = require('express');
const cookieParser = require('cookie-parser');
const handlers = require('./handlers');
const Users = require('./models/users');
const Challenges = require('./models/challenges');
const {challengesRouter} = require('./routes/challenges');

const app = express();

app.set('view engine', 'ejs');

const users = Users.load([{
  name: 'john',
  password: '1234',
  challenges: [1]
}])

const challenges = Challenges.load([
  {
    id: 1,
    title: 'something',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto reprehenderit eos provident laboriosam recusandae temporibus magnam, illum adipisci voluptates, animi praesentium dicta debitis? Qui eius, provident eligendi accusantium repellat ab?',
    createdBy: 'john',
    createdAt: 'Thu May 21 2020 19:16:45 GMT+0530 (India Standard Time)',
    solvers: [
      {
        name: 'raja',
        startedAt: 'Thu May 21 2020 19:16:45 GMT+0530 (India Standard Time)',
        isSolved: false,
        solvedAt: undefined
      }
    ],
    discussions: [
      {
        title: 'wrong input', 
        comments: [
          {
            name: 'john', 
            comment: 'some text'
          },
          {
            name: 'john', 
            comment: 'some more text'
          }
        ]
      },
      {
        title: 'question didn\'t understand',
        comments: []
      }
    ]
  }
]);

const sessions = {};

app.locals.users = users;
app.locals.challenges = challenges;
app.locals.sessions = sessions;

app.use(express.static('public', {index: false}))
app.use(cookieParser());
app.use(express.json())
app.use(handlers.findUser);
app.get('/', handlers.serveHomepage);
app.post('/login', handlers.login);
app.post('/signup', handlers.signup);
app.get('/logout', handlers.logout);
app.use('/challenges', challengesRouter);

module.exports = {app};