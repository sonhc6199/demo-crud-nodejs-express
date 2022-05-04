const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Type = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    coefficient: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Type', Type);