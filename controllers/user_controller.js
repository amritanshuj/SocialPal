const User = require("../models/user");
const fs = require('fs');
const path = require('path');
const e = require('express');
const Post = require('../models/post');

module.exports.profile = async function (req, res) {

    try {
        let user = await User.findById(req.params.id); 

        let posts = await Post.find({ user: req.params.id })
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user likes',
                }
            }).populate('likes');
            let users = await User.find({});

        let friends = await User.find({ friendships: req.params.id });

        return res.render('users', {
            title: user.name,
            profile_users: user,
            posts: posts,
            friendships: friends,
            all_users: users,
        });

    } catch (err) {
        console.log("ERROR", err);
    }
}

module.exports.update = async function(req, res){

    if(req.user.id == req.params.id){
        try{
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log('Multer Error:', err)}

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    //saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        } catch(err){
            req.flash('error', err);
            return res.redirect('back');
        } 
    } else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }

    
}

//Render sign-up page
module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    req.flash('success', 'Account created successfully!');
    return res.render('user_sign_up', {
        title: "SocialPal | Sign Up"
    })
}

//Render sign-in page
module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "SocialPal | Sign In"
    })
}

//Get sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user in signing up'); return}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('Error in signing up user'); return}

                return res.redirect('/users/sign-in');
            })
        }
        else{
            res.redirect('back');
        }
    })
}
//Sign In and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged In Successfully!');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}

