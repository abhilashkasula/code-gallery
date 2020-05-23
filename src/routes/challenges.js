const express = require('express');
const handlers = require('../handlers');

const challengesRouter = express.Router();

challengesRouter.use(handlers.allow);
challengesRouter.get('/', handlers.serveChallenges);
challengesRouter.get(/\/[0-9]{1,}/, handlers.serveChallenge);
challengesRouter.post('/new', handlers.hasFields('title', 'description'), handlers.createNewChallenge);
challengesRouter.post('/pickup', handlers.hasFields('id'), handlers.pickChallenge);
challengesRouter.post('/newDiscussion',
  handlers.hasFields('title', 'comment', 'id'),
  handlers.createDiscussion);
challengesRouter.post('/addComment', 
  handlers.hasFields('comment', 'discussionId', 'challengeId'),
  handlers.addComment);

module.exports = {challengesRouter};
