const homeRouter = require('./home');
const userRouter = require('./user');
const productRouter = require('./product');
const categoryRouter = require('./category');

function route(app) {
    app.use('/', homeRouter);
    app.use('/api/auth/', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/category', categoryRouter);
}

module.exports = route