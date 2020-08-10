const User = require("../models/user");

module.exports.profile = function(req, res){
    res.render('users',{
        title: "Users"
    });
}

//Render sign-up page
module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}

