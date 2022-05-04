const User = require('../models/User');
const JWT = require('jsonwebtoken');
const DBService = require('../../src/services/db.service.js');

const encodeToken = (UserId) => {
    return JWT.sign({
        iss: 'demofwork',
        sub: UserId,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 3)
    }, process.env.APP_JWT_SECRET)
}

class UserController {
    async signUp(req, res) {
        const { username, password } = req.body;
        const user = await DBService.getDocByFilter('User', { username });
        // const user = await User.findOne({ username });
        // if (user) return res.status(403).json({ message: 'username is already exist.' });
        // const newUser = new User({ username, password });
        // newUser.save();
        res.status(200).json({ user });
    }

    async signIn(req, res) {
        const { username } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(403).json({ message: 'username is not exist.' });
        const token = encodeToken(user._id);
        // res.setHeader('Authorization', token);
        res.status(200).json({ accessToken: token });
    }

    async list(req, res) {
        const userList = await User.find({}).sort({ createdAt: -1 });
        res.json({ userList });
    }

}

module.exports = new UserController