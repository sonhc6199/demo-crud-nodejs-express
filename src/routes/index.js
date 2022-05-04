const homeRouter = require('./home');
const userRouter = require('./user');
function route(app) {
    app.use('/', homeRouter);
    app.use('/api/auth/', userRouter);
}

module.exports = route