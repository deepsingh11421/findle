const User = require('../models/user');
const fs = require('fs');
const path = require('path');

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
                console.log(req.body);
                if(err){console.log('Error in creating the user',err);return res.redirect('back');}

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

module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('profile',{
            profile_user: user
        });
    });
}

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            console.log(req.body);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('Multer Error',err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    user.avatar = User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }catch(err){
            console.log(err);
            return res.redirect('back');
        }
    }else{
        console.log('User Unauthorised');
        return res.status(401).send('Unauthorised');
    }
}