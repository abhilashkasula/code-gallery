module.exports = {
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  PORT: process.env.PORT || 8000,
  SLACK_URL: process.env.SLACK_URL
}