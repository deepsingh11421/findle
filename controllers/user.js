const User = require('../models/user');

module.exports.signUp = function(req,res){
    return res.render('signUp',{ layout: false });
}

module.exports.create = function(req,res){
    console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log('Error in finding the user');}

        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('Error in creating the user');}

                return res.redirect('/user/signIn');
            });
        }else{
            return res.redirect('back');
        }
    });
}

module.exports.signIn = function(req,res){
    return res.render('signIn',{ layout: false });
}

module.exports.createSession = function(req,res){
    console.log('Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    console.log('Logged out successfully');
    return res.redirect('/');
}