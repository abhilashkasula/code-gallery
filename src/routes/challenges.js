const express = require('express');
const handlers = require('../handlers');

const challengesRouter = express.Router();

challengesRouter.use(handlers.allow);
challengesRouter.get('/', handlers.serveChallenges);
challengesRouter.get(/\/[0-9]{1,}/, handlers.serveChallenge);
challengesRouter.post('/new', handlers.hasFields('title', 'description'), handlers.createNewChallenge);

module.exports = {challengesRouter};
