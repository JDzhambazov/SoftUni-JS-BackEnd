const cubeControllers = require('../controllers/cube')

module.exports = (app) => {

    app.get('/about',cubeControllers.about);

    app.get('/create',cubeControllers.getCreate);

    app.post('/create',cubeControllers.postCreate)

    app.get('/details/:id', cubeControllers.details);

    app.get('/error',cubeControllers.error);

    app.get('/',cubeControllers.index);
};