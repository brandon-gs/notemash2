const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const helpers = require('./helpers');
const User = require('../models/User');


passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    done(null, req.body);
} ));

passport.use('local.register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { email, name } = req.body;
    let newUser = {
        name,
        username,
        email,
        password
    }
    newUser.password = await helpers.encryptPassword(password);
    const nUser = new User(newUser);
    // Saving in the Database
    const res = await nUser.save();
    newUser.id = res._id;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    if(!user.id){
        done(null, user._id);
    } else {
        done(null, user.id);
    }
});

passport.deserializeUser(async (_id, done) => {
    const res = await User.findById(_id);
    done(null, res);
});