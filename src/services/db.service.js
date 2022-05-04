const mongoose = require('mongoose');
const APIError = require('../../app/middlewares/api-error.middleware');
class DBService {

    async getDocByFilter(modelName, filter, options) {
        const doc = await mongoose.model(modelName).findOne(filter);
        if (!doc) {
            throw new APIError(400, 'database failed to connect');
        }
        return doc;

    }

}


module.exports = new DBService