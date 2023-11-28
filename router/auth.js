const express = require('express');
const router = express.Router();
const controller = require('../app/controller');
const { auth } = require('../utils/jwt');
const passport = require('../utils/passport');

router.post('/v1/auth/login', controller.auth.login);
router.post('/v1/auth/register', controller.auth.register);
router.get('/v1/dashboard', controller.auth.dashboard);
router.get('/v1/auth/whoami', auth, controller.auth.whoami);

router.get('/register', (req, res) => {
    res.render('register.ejs');
})
router.post('/register', controller.auth.registerForm)

router.get('/login', (req, res) => {
    res.render('login.ejs');
})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/v1/dashboard',
    failureRedirect: '/login'
}))

module.exports = router;
