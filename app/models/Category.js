const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Category = new Schema({
    name: { type: 'string', required: true },
    code: { type: 'string', required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Category', Category);;
