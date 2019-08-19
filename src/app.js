const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const Store = session.Store;
const MongooseStore = require('mongoose-express-session')(Store);
const passport = require('passport');
const mongoose = require('./database');

require('./lib/passport');

// SETTINGS
app.set('port', process.env.PORT || 3000);

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'garciasanchezz12',
    resave: false,
    saveUninitialized: false,
    store: new MongooseStore({
        connection: mongoose
    })
}));
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use(require('./routes/users'));

// STATIC FILES
app.use('/static', express.static(path.join(__dirname + '../static')));

module.exports = app;