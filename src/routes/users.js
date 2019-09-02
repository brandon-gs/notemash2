const { Router } = require('express');
const router = Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const { 
    verifyUser, getUser, getUsers,
    checkUser, checkEmail, logOut,
    getUserId
} = require('../controllers/user.controllers');

router.post('/api/getUsers', getUsers);

router.post('/api/getUserId', getUserId);

router.post('/verifyUser', isNotLoggedIn, verifyUser);

router.post('/getUser', isLoggedIn, getUser);

router.post('/checkUser', isNotLoggedIn, checkUser);

router.post('/checkEmail', isNotLoggedIn, checkEmail);

router.post('/logout', isLoggedIn, logOut);

router.post('/register', isNotLoggedIn, passport.authenticate('local.register', {
    successRedirect: '/profile',
    failureRedirect: '/register'
}));

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    })(req, res, next);
});


module.exports = router;