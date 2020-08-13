const User = require("../models/user");

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        res.render('users',{
            title: "Users",
            profile_user: user
        });
    })
    
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    } else{
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

