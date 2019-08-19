const mongoose = require('mongoose');

const URI = 'mongodb+srv://cosmo:garciasanchezz12@mern-stack-lttnb.mongodb.net/test' || 'mongodb://localhost/databasetest';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('>> DB is connected');
});

module.exports = mongoose;