const serveHomepage = function (req, res) {
  const {sessions, challenges} = req.app.locals;
  const {session} = req.cookies;
  if(session && sessions[session]) {
    const user = req.app.locals.users.find(user => user.name === sessions[session]);
    return res.render('pages/home', {user, challenges});
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
  if (!challenge)
    return res.sendStatus(404);
  res.render('pages/challenge', {user: {name:'john'},  challenge});
};

const login = function(req, res) {
  const {username, password} = req.body;
  const user = req.app.locals.users.find(user => user.name === username);

  if(user && user.password === password) {
    req.app.locals.sessions[1] = user.name;
    return res.cookie('session', 1).json({isValidUser: true, dest: '/'});
  }
  res.json({isValidUser: false});
};

module.exports = {serveHomepage, serveChallenges, serveChallenge, login};
