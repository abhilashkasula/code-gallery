const express = require('express');
const cookieParser = require('cookie-parser');
const handlers = require('./handlers');
const {challengesRouter} = require('./routes/challenges');

const app = express();

app.set('view engine', 'ejs');

const users = [{
    name: 'john',
    password: '1234',
    challenges: [{id: 1, takenAt: 'mon', isCompleted: false, completedAt: 'mon'}]
}];

const challenges = [
  {
    id: 1,
    title: 'something',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto reprehenderit eos provident laboriosam recusandae temporibus magnam, illum adipisci voluptates, animi praesentium dicta debitis? Qui eius, provident eligendi accusantium repellat ab?',
    postedBy: 'john',
    postedAt: 'mon',
    tookUpBy: [
      {
        name: 'raja',
        tookAt: 'mon',
      },
      {
        name: 'ravi',
        tookAt: 'mon',
      }
    ],
    solvedBy: [
      {
        name: 'raja',
        solvedAt: 'mon',
      }
    ],
    discussions: [
      {
        title: 'wrong input', 
        comments: [
          {
            postedBy: 'john', 
            comment: 'some text'
          },
          {
            postedBy: 'john', 
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
]

const sessions = {1: 'john'};

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
app.use('/challenges', challengesRouter);

module.exports = {app};