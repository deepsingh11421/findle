const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const passport = require('passport');

router.get('/signUp',userController.signUp);
router.post('/create',userController.create);
router.get('/signIn',userController.signIn);
router.get('/destroySession',userController.destroySession);
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/signIn'} 
),userController.createSession);

module.exports = router;
