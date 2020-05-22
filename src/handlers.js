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
  res.render('pages/challenge', {user: req.user, challenge});
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
  const json = JSON.stringify(req.app.locals.users);
  req.app.locals.db.set('code-gallery-users', json);
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
  return res.status(400).render('pages/not_found', {
    status: 400,
    title: 'You\'re Not Allowed',
    message: 'Please login to continue'
  });
}

const createNewChallenge = function(req, res) {
  const {title, description} = req.body;
  const {challenges, users} = req.app.locals;
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
  challenges.add(challenge);
  const id = challenges.generateNextId();
  users.addChallenge(req.user.name, id - 1);
  const json = JSON.stringify(challenges);
  req.app.locals.db.set('code-gallery-challenges', json);
  res.end();
};

const logout = function(req, res, next) {
  if(!req.user) return next();
  const {session} = req.cookies;
  delete req.app.locals.sessions[session];
  res.clearCookie('session').redirect('/');
};

const serveNotFound = function(req, res) {
  const status = 404;
  const title = 'Page Not Found';
  const message = 'Your requested page is not with us';
  res.status(status).render('pages/not_found', {status, title, message});
};

const hasFields = function(...fields) {
  return (req, res, next) => {
    if(fields.every(field => field in req.body)) return next();
    res.status(400).render('pages/not_found', {
      status: 400,
      title: 'Bad Request',
      message: 'Not enough params'
    });
  }
};

module.exports = {
  serveHomepage,
  serveChallenges,
  serveChallenge,
  login,
  signup,
  findUser,
  allow,
  createNewChallenge,
  logout,
  serveNotFound,
  hasFields
};
