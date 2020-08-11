const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile); //profile page will only open if signed in, if not then sign in page opens
router.post('/update/:id', passport.checkAuthentication, usersController.update); 

router.get('/sign-up', usersController.signup);
router.get('/sign-in', usersController.signin);

router.post('/create', usersController.create);

//Use passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports = router;