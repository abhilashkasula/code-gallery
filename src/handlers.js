const serveHomepage = function (req, res) {
  if(!req.user) return res.render('pages/login');
  const options = {
    user: req.user,
    challenges: JSON.parse(JSON.stringify(req.app.locals.challenges))
  }
  return res.render('pages/home', options);
};

const serveChallenges = function (req, res) {
  res.render('pages/challenges', {
    user: req.user,
    challenges: JSON.parse(JSON.stringify(req.app.locals.challenges)),
  });
};

const serveChallenge = function (req, res) {
  const id = +req.url.split('/')[1];
  const challenge = req.app.locals.challenges.getChallenge(id);
  if (!challenge) return res.sendStatus(404);
  res.render('pages/challenge', {user: {name: 'john'}, challenge});
};

const generateSeq = num => () => ++num;
const generateSessionId = generateSeq(0);

const login = function (req, res) {
  const {username, password} = req.body;
  const {users} = req.app.locals;
  const name = users.validate(username, password);
  if(!name) return res.json({isValidUser: false});
  const id = generateSessionId();
  req.app.locals.sessions[id] = name;
  res.cookie('session', id).json({isValidUser: true, dest: '/'});
};

const signup = function (req, res) {
  const {username, password} = req.body;
  const isValidUser = req.app.locals.users.add(username, password, []);
  res.json({isValidUser, dest: '/'});
};

const findUser = function (req, res, next) {
  const {session} = req.cookies;
  const {users, sessions} = req.app.locals;
  if (session && sessions[session]) {
    req.user = users.getUser(sessions[session]);
  }
  next();
};

const allow = function(req, res, next) {
  if(req.user) {
    return next();
  }
  return res.status(404).send('You need to login first');
}

const createNewChallenge = function(req, res) {
  const {title, description} = req.body;
  const time = new Date();
  const challenge = {
    title,
    description,
    createdBy: req.user.name,
    createdAt: time,
    solvers: [{
      name: req.user.name,
      startedAt: time,
      isSolved: false,
      solvedAt: undefined
    }],
    discussions: []
  }
  req.app.locals.challenges.add(challenge);
  const id = req.app.locals.challenges.generateNextId();
  req.app.locals.users.addChallenge(req.user.name, id - 1);
}

module.exports = {
  serveHomepage,
  serveChallenges,
  serveChallenge,
  login,
  signup,
  findUser,
  allow,
  createNewChallenge
};
