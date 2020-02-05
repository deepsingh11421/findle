const express = require('express');
const path = require('path');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const cookieParser = require('cookie-parser');
const app = express();

app.set('view engine','ejs');
app.set('views','./views');
app.use(cookieParser());
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.urlencoded());
app.use(express.static('assets'));

app.use(session({
    name: 'findle',
    secret: 'blahblah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (100*60*100) //millisec
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server');
    }
    console.log('Server running on port',port);
});