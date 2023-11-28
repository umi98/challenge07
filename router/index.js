const express = require('express');
const router = express.Router();

const auth = require('./auth');
const user = require('./user');

router.use(auth);
router.use(user);

router.get('/', (req, res) => {
    res.render('index.ejs');
})

module.exports = router;