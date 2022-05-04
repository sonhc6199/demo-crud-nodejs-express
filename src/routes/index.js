const homeRouter = require('./home');
const userRouter = require('./user');
const productRouter = require('./product');

function route(app) {
    app.use('/', homeRouter);
    app.use('/api/auth/', userRouter);
    app.use('/api/product', productRouter);
}

module.exports = route