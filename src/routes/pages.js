const nextApp = require('../index');
const { Router } = require('express');
const router = Router();

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/', isNotLoggedIn, (req, res) => {
    return nextApp.render(req, res, '/index', req.query);
});

router.get('/login', isNotLoggedIn, (req, res) => {
    return nextApp.render(req, res, '/login', req.query);
});

router.get('/register', isNotLoggedIn, (req, res) => {
    return nextApp.render(req, res, '/register', req.query);
});

router.get('/registro', isNotLoggedIn, (req, res) => {
    return nextApp.render(req, res, '/register', req.query);
});

router.get('/notes', isLoggedIn, (req, res) => {
    return nextApp.render(req, res, '/notes', req.query);
});

router.get('/notas', isLoggedIn, (req, res) => {
    return nextApp.render(req, res, '/notes', req.query);
});

router.post('/getAuth', (req, res) => {
    res.send(req.isAuthenticated());
})

module.exports = router;