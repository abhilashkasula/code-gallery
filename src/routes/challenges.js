const express = require('express');
const handlers = require('../handlers');

const challengesRouter = express.Router();

challengesRouter.get('/', handlers.serveChallenges);
challengesRouter.get(/\/[0-9]{1,}/, handlers.serveChallenge);

module.exports = {challengesRouter};
