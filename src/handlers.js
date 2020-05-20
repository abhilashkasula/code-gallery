const serveHomepage = function (req, res) {
  res.render('pages/index', {isAuthenticated: true, user: {name: 'john'}, challenges: []});
};

module.exports = {serveHomepage};
