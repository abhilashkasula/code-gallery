const {app} = require('./src/app');
const {PORT} = require('./config');

app.listen(PORT, () => console.log(`listening at ${PORT}`));
