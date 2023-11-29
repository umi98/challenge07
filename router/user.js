const express = require('express');
const router = express.Router();
const controller = require('../app/controller');

router.post('/v1/auth/forgetpassword', controller.user.resetPasswordEmail);
router.put('/v1/auth/sendemail', controller.user.resetPasswordEmail);
router.put('/v1/auth/resetpassword/:token', controller.user.resetPassword);
router.get('/resetpassword', (req, res) => {
    res.render('resetpassword.ejs');
})
router.get('/v1/users', controller.user.getAll);

module.exports = router;