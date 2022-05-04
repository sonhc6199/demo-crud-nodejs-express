const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bcrypt = require('bcryptjs');

const User = new Schema({
    username: { type: String, required: true },
    role: { type: String, default: 'student' },
    password: { type: String, required: true },
}, { timestamps: true });

User.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    }
    catch (err) {
        next(err);
    }
});

User.methods.isValidPassword = async function (enterPassword) {
    try {
        return await bcrypt.compare(enterPassword, this.password).then()
    }
    catch (error) {
        throw new Error(error);
    }
}

User.methods.hasRole = async function (userID) {
    return await User.findById(userID) ?? '';
}

module.exports = mongoose.model('User', User);