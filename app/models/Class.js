const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Class = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Class', Class);