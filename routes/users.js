const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controller');
const friendsController = require('../controllers/friendship_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile); //profile page will only open if signed in, if not then sign in page opens
router.post('/update/:id', passport.checkAuthentication, usersController.update); 

router.get('/createfriendship/:id', passport.checkAuthentication,friendsController.createFriensdhip);
router.get('/destroyfriendship/:id', passport.checkAuthentication,friendsController.destroyFriendship);

router.get('/sign-up', usersController.signup);
router.get('/sign-in', usersController.signin);

router.post('/create', usersController.create);

//Use passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);


module.exports = router;