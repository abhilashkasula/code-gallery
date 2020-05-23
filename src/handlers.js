const serveHomepage = function (req, res) {
  if(!req.user) return res.render('pages/login');
  const options = {
    user: req.user,
    challenges: req.app.locals.challenges.getStatus()
  }
  return res.render('pages/home', options);
};

const serveChallenges = function (req, res) {
  res.render('pages/challenges', {
    user: req.user,
    challenges: req.app.locals.challenges.getStatus(),
  });
};

const serveChallenge = function (req, res) {
  const id = +req.url.split('/')[1];
  const challenge = req.app.locals.challenges.getChallengeStatus(id);
  if (!challenge) return res.sendStatus(404);
  res.render('pages/challenge', {user: req.user, challenge});
};

const generateSeq = num => () => ++num;
const generateSessionId = generateSeq(0);

const login = function (req, res) {
  const {username, password} = req.body;
  const {users} = req.app.locals;
  const name = users.validate(username.toLowerCase(), password);
  if(!name) return res.json({isValidUser: false});
  const id = generateSessionId();
  req.app.locals.sessions[id] = name;
  res.cookie('session', id).json({isValidUser: true, dest: '/'});
};

const signup = function (req, res) {
  const {username, password} = req.body;
  const isValidUser = req.app.locals.users.add(username.toLowerCase(), password, []);
  const json = JSON.stringify(req.app.locals.users);
  req.app.locals.db.set('code-gallery-users', json);
  res.json({isValidUser, dest: '/'});
};

const findUser = function (req, res, next) {
  const {session} = req.cookies;
  const {users, sessions} = req.app.locals;
  if (session && sessions[session]) {
    req.user = users.getUserStatus(sessions[session]);
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

const serveErr = function(req, res) {
  const msg = 'You are trying wrong. Make sure everything is right.';
  res.status(400).json({err: true, msg});
};

const pickChallenge = function(req, res) {
  const {id} = req.body;
  const {challenges, users, db} = req.app.locals;
  const [viewingId] = req.headers.referer.split('/').slice(-1);
  if(id !== viewingId || req.user.challenges.includes(+id)) {
    return serveErr(req, res);
  }
  const solver = {
    name: req.user.name,
    startedAt: new Date(),
    isSolved: false,
    solvedAt: undefined
  }
  challenges.addSolver(+id, solver);
  users.addChallenge(req.user.name, +id);
  db.set('code-gallery-users', JSON.stringify(users));
  db.set('code-gallery-challenges', JSON.stringify(challenges));
  res.json({err:false});
};

const createDiscussion = function(req, res) {
  const {title, comment, id} = req.body;
  const {challenges, db} = req.app.locals;
  const [viewingId] = req.headers.referer.split('/').slice(-1);
  if(id !== viewingId || !req.user.challenges.includes(+id)) {
    return serveErr(req, res);
  }
  challenges.addDiscussion(+id, title, [{name: req.user.name, comment}]);
  db.set('code-gallery-challenges', JSON.stringify(challenges));
  res.json({err: false});
};

const addComment = function(req, res) {
  const {comment, discussionId, challengeId} = req.body;
  const {challenges, db} = req.app.locals;
  const [viewingId] = req.headers.referer.split('/').slice(-1);
  if(challengeId !== viewingId || !req.user.challenges.includes(+challengeId)) {
    return serveErr(req, res);
  }
  challenges.addComment(+challengeId, +discussionId, req.user.name, comment);
  db.set('code-gallery-challenges', JSON.stringify(challenges));
  const challenge = challenges.getChallengeStatus(+challengeId)
  const discussion = challenge.discussions.find(d => d.id === +discussionId);
  res.json({err: false, discussion, name: req.user.name});
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
  hasFields,
  pickChallenge,
  createDiscussion,
  addComment
};
