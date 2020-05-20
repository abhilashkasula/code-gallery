const express = require('express');
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

app.locals.users = users;
app.locals.challenges = challenges;

app.use(express.static('public', {index: false}))
app.get('/', handlers.serveHomepage);
app.use('/challenges', challengesRouter);

module.exports = {app};