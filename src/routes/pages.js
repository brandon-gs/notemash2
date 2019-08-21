const nextApp = require('../index');
const { Router } = require('express');
const router = Router();
const User = require('../models/User');

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

router.get('/:username', async (req, res) => {
    const { username } = req.params;
    User.findOne({ username })
        .then(user => {
            if (user === null) {
                res.json("Usuario no encontrado");
            } else if (!req.isAuthenticated()) {
                const { _id, name, username } = user;
                return nextApp.render(req, res, '/profiles/profileOut', { _id, name, username });
            } else if (req.isAuthenticated() && req.user.username != user.username) {
                const { _id, name, username } = user;
                res.json(`Auth Perfil de ${_id} ${name} ${username}`);
            } else {
                return nextApp.render(req, res, '/profile', req.query);
            }
        })
        .catch(e => {
            res.json("Error");
            console.log("Error " + e);
        });
});

router.get('/notas', isLoggedIn, (req, res) => {
    return nextApp.render(req, res, '/notes', req.query);
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

router.post('/getAuth', (req, res) => {
    res.send(req.isAuthenticated());
})

module.exports = router;