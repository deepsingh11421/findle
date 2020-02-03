const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const app = express();

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.urlencoded());
app.use(express.static('assets'));

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server');
    }
    console.log('Server running on port',port);
});