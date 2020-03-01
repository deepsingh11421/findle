const express = require('express');
const path = require('path');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');
const MongoStore = require('connect-mongo')(session);
const app = express();

app.set('view engine','ejs');
app.set('views','./views');
app.use(cookieParser());
app.use(expressLayouts);
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));
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
        maxAge :(10000*60*100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || 'connect mongo-db setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/uploads',express.static(__dirname+'/uploads'));
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server');
    }
    console.log('Server running on port',port);
});