const express = require('express');
const router = express.Router();
const passport = require('passport');

const likesController = require('../controllers/likes_controller');

router.post('/toggle', likesController.toggleLike);
//router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);
module.exports = router;
