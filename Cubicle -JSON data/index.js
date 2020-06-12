const env = process.env.NODE_ENV || 'development';
global.__appPath = __dirname;

const config = require('./config/config')[env];
const app = require('express')();
const cubeModel = require('./models/cubemodel')


require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));