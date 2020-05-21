const serveHomepage = function (req, res) {
  if(req.user) {
    return res.render('pages/home', {user: req.user});
  }
  res.render('pages/login');
};

const serveChallenges = function (req, res) {
  res.render('pages/challenges', {
    user: req.app.locals.users[0],
    challenges: req.app.locals.challenges,
  });
};

const serveChallenge = function (req, res) {
  const id = +req.url.split('/')[1];
  const {challenges} = req.app.locals;
  const challenge = challenges.find((challenge) => challenge.id === id);
  if (!challenge) return res.sendStatus(404);
  res.render('pages/challenge', {user: {name: 'john'}, challenge});
};

const login = function (req, res) {
  const {username, password} = req.body;
  const user = req.app.locals.users.find((user) => user.name === username);

  if (user && user.password === password) {
    req.app.locals.sessions[1] = user.name;
    return res.cookie('session', 1).json({isValidUser: true, dest: '/'});
  }
  res.json({isValidUser: false});
};

const signup = function (req, res) {
  const {username, password} = req.body;
  const user = req.app.locals.users.find((user) => user.name === username);

  if (user) return res.json({isValidUser: false});
  req.app.locals.users.push({name: username, password, challenges: []});
  return res.json({isValidUser: true, dest: '/'});
};

const findUser = function (req, res, next) {
  const {session} = req.cookies;
  const {users, sessions} = req.app.locals;
  if (session && sessions[session]) {
    req.user = users.find((user) => user.name === sessions[session]);
  }
  next();
};

const allow = function(req, res, next) {
  if(req.user) {
    return next();
  }
  return res.status(404).send('You need to login first');
}

module.exports = {
  serveHomepage,
  serveChallenges,
  serveChallenge,
  login,
  signup,
  findUser,
  allow
};
