const express = require('express');
const router = express.Router();
const UserController = require('../../app/controllers/UserController');

const { schemas, validateBody, validateParam } = require('../../app/middlewares/validator.middleware');
const passportMiddware = require('../../app/middlewares/passport.middleware');
var passport = require('passport');


router.get('/users', passport.authenticate('jwt', { session: false }), UserController.list);

router.post('/sign-up', validateBody(schemas.userSchema), UserController.signUp);

router.post('/sign-in', validateBody(schemas.userSchema), passport.authenticate('local', { session: false }), UserController.signIn);

module.exports = router