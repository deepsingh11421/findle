const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const passport = require('passport');

router.get('/signUp',userController.signUp);
router.post('/create',userController.create);
router.get('/signIn',userController.signIn);
router.get('/destroySession',userController.destroySession);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/signIn'} 
),userController.createSession);

module.exports = router;
