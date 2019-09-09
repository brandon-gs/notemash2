const userCtrl = {};

const User = require('../models/User');
const helpers = require('../lib/helpers');

userCtrl.getUser = (req, res) => {
    res.json(req.user);
}

userCtrl.getUserId = (req, res) => {
    const { _id } = req.user;
    res.json({ _id });
}

userCtrl.getUsers = async (req, res) => {
    const users = await User.find({}, { "username": 1, "updatedAt": 1, "_id": 0 });
    res.json(users);
}

userCtrl.checkUser = async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ username });
    const using = user === null ? false : true;
    res.json({ using });
}

userCtrl.checkEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const using = user === null ? false : true;
    res.json({ using });
}

userCtrl.logOut = (req, res) => {
    req.session.cookie.maxAge = 0;
    req.logOut();
    res.redirect('/');
}

userCtrl.verifyUser = async (req, res) => {
    const { username } = req.body;
    const result = await User.findOne({ username }) || await User.findOne({ email: username });
    if (result == null) {
        res.json({ message: 404 })
    } else {
        const user = result;
        const validPassword = await helpers.matchPassword(req.body.password, user.password);
        if (validPassword) {
            res.json({ user });
        } else {
            res.json({ message: 401 });
        }
    }
}

module.exports = userCtrl;