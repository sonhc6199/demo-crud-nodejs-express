const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Student = new Schema({
    code: { type: String, required: true, unique: true },
    email: { type: String },
    fullName: { type: String, required: true },
    classID: { type: String, required: true },
    address: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', Student);