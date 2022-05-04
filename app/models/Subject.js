const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Subject = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    classID: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Subject', Subject);