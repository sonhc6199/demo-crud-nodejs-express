const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Result = new Schema({
    ResultID: { type: String, required: true },
    subjectID: { type: String, required: true },
    resultTypeID: { type: String, required: true },
    score: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Result', Result);