const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user_controller');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signup);
router.get('/sign-in', usersController.signin);
router.get('/sign-out', usersController.signout);

router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);

module.exports = router;