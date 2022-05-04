const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: process.env.APP_JWT_SECRET
}, function (payload, done) {
    User.findById(payload.sub, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
}))


passport.use(new LocalStrategy({
    usernameField: 'username'
}, (username, password, done) => {
    User.findOne({ username }, async (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            const isValidPassword = await user.isValidPassword(password);
            if (!isValidPassword) return done(null, false);
            done(null, user);
        }
        else {
            return done(null, false);
        }
    })
}));