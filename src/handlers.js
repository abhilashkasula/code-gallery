const serveHomepage = function (req, res) {
  res.render('pages/home', {
    isAuthenticated: true,
    user: {name: 'john'},
    challenges: req.app.locals.challenges,
  });
};

const serveChallenges = function (req, res) {
  res.render('pages/challenges', {
    isAuthenticated: true,
    user: req.app.locals.users[0],
    challenges: req.app.locals.challenges,
  });
};

const serveChallenge = function (req, res) {
  const id = +req.url.split('/')[1];
  const {challenges} = req.app.locals;
  const challenge = challenges.find((challenge) => challenge.id === id);
  if (!challenge)
    return res.sendStatus(404);
  res.render('pages/challenge', {isAuthenticated: true, user: {name:'john'},  challenge});
};

module.exports = {serveHomepage, serveChallenges, serveChallenge};
