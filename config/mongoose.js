const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/findle_db');

const db = mongoose.connection;
db.on('error',console.error.bind(console,'Error conecting to DB'));

db.once('open',function(){
    console.log('Successfully connected to DB');
});

module.exports = db;