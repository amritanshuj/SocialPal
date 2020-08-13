const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

//Import user
const User = require('../models/user');

//Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req, email, password, done){ //done(for taking action)has two args: err & user(if conditions satisfied)
        //find a user and establish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            }

            if(!user || user.password != password){
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            //no err, pass user
            return done(null, user);
        })
    }
))

//Seializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//Deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user  -> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

//check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains current signed in user from the session cookie 
        // we are just sending it to the locals for the views(response)
        res.locals.user = req.user;
    }
    
    next();
}


module.exports = passport;