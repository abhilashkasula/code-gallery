const https = require('https');
const {SLACK_URL} = require('../config');

const notifySlack = function(name) {
  const text = `${name} newly signed up`;
  const options = {method: 'POST'};
  const data = {text};
  SLACK_URL && (() => {
    const req = https.request(SLACK_URL, options, res => {
      console.log('Status code: ', res.statusCode);
    });
    req.write(JSON.stringify(data));
    req.end();
  })();
};

module.exports = {notifySlack};
